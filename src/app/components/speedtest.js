'use client';
import React, { useState } from 'react';
import { Button } from '@/app/components/ui/Button';
import {
  Activity,
  Wifi,
  MapPin,
  Upload,
  Download,
  Zap,
  Settings,
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import SettingsDialog from '@/app/components/ui/settings-dialog';
import { NetworkAnalysis } from '@/app/components/NetworkAnalysis';
import { AIAnalysis } from '@/app/components/AIAnalysis';
import API_CONFIG from '../../config/api';
import { DevConsole } from '@/app/components/DevConsole';

const SpeedTest = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [code, setCode] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const runSpeedTest = async () => {
    setLoading(true);
    setError(null);

    const apiKey = localStorage.getItem('speedtest_api_key');
    const provider = localStorage.getItem('speedtest_provider');

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...(localStorage.getItem('speedtest_enable_ai') === 'true' &&
      apiKey &&
      provider
        ? {
            'X-API-Key': apiKey,
            'X-Provider': provider,
          }
        : {}),
    };

    try {
      // First request - Status updates
      const statusResponse = await fetch(
        `${API_CONFIG.baseUrl}/speedtest/status`,
        {
          headers,
        }
      );

      if (!statusResponse.ok) {
        throw new Error('Failed to fetch status');
      }

      const reader = statusResponse.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6));
            setStatus(data.status);
            setCode(data.code);
          }
        }
      }

      // Second request - Speed test results
      const testResponse = await fetch(`${API_CONFIG.baseUrl}/speedtest`, {
        method: 'POST',
        headers,
      });

      if (!testResponse.ok) {
        throw new Error('Failed to run speed test');
      }

      const data = await testResponse.json();
      setResult(data);
    } catch (err) {
      setError('Failed to run speed test. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const exportTestData = () => {
    if (!result) return;

    const exportData = {
      timestamp: new Date().toISOString(),
      metrics: {
        download_speed_mbps: result.download_speed,
        upload_speed_mbps: result.upload_speed,
        latency_ms: result.ping_ms,
      },
      system_metrics: result.system_metrics || null,
      raw_analysis: result.network_analysis || null,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `speedtest-results-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white p-4'>
      <div className='w-full max-w-2xl space-y-8'>
        <div className='text-center space-y-2'>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>
            Network Analysis Module
          </h1>
          <p className='text-gray-400'>
            Advanced Network Diagnostics System v1.0
          </p>
        </div>

        {loading && status && (
          <Card className='bg-gray-900/50 border-gray-800'>
            <CardHeader>
              <CardTitle className='text-green-500'>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='font-mono space-y-4'>
                <div className='text-blue-400'>{'> ' + status}</div>
                <div className='text-green-400 text-sm overflow-x-auto'>
                  $ {code}
                </div>
                <div className='flex space-x-1'>
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className='h-1 w-1 bg-green-500 rounded-full animate-pulse'
                      style={{ animationDelay: `${i * 200}ms` }}
                    />
                  ))}
                </div>
              </div>
              <div className='mt-4 w-full bg-gray-800 rounded-full h-1'>
                <motion.div
                  className='bg-green-500 h-1 rounded-full'
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Speed Test Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='w-full'
        >
          <Button
            className='w-full h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold text-lg'
            onClick={runSpeedTest}
            disabled={loading}
          >
            {loading ? (
              <div className='flex items-center space-x-2'>
                <Activity className='w-5 h-5 animate-pulse' />
                <span>Testing Speed...</span>
              </div>
            ) : (
              <div className='flex items-center space-x-2'>
                <Wifi className='w-5 h-5' />
                <span>Start Speed Test</span>
              </div>
            )}
          </Button>
        </motion.div>

        {error && (
          <div className='text-red-500 text-center p-4 bg-red-950/50 rounded-lg'>
            {error}
          </div>
        )}

        {result && (
          <div className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <Card className='bg-gray-900/50 border-gray-800'>
                <CardHeader>
                  <CardTitle className='text-xl flex items-center gap-2'>
                    <Download className='w-5 h-5 text-blue-500' />
                    Download
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-3xl font-bold text-blue-500'>
                    {result.download_speed?.toFixed(1)} Mbps
                  </div>
                </CardContent>
              </Card>

              <Card className='bg-gray-900/50 border-gray-800'>
                <CardHeader>
                  <CardTitle className='text-xl flex items-center gap-2'>
                    <Upload className='w-5 h-5 text-purple-500' />
                    Upload
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-3xl font-bold text-purple-500'>
                    {result.upload_speed?.toFixed(1)} Mbps
                  </div>
                </CardContent>
              </Card>

              <Card className='bg-gray-900/50 border-gray-800'>
                <CardHeader>
                  <CardTitle className='text-xl flex items-center gap-2'>
                    <Zap className='w-5 h-5 text-yellow-500' />
                    Ping
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-3xl font-bold text-yellow-500'>
                    {result.ping_ms?.toFixed(1)} ms
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Network Analysis */}
            {result.network_analysis && (
              <NetworkAnalysis analysis={result.network_analysis} />
            )}

            {/* AI Analysis */}
            {result.ai_analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <AIAnalysis analysis={result.ai_analysis} />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='flex justify-end mb-4'
            >
              <Button
                onClick={exportTestData}
                className='bg-gray-800 hover:bg-gray-700 text-sm flex items-center gap-2'
              >
                <Download className='w-4 h-4' />
                Export Raw Data
              </Button>
            </motion.div>

            <DevConsole data={result} />
          </div>
        )}
      </div>

      <Button
        onClick={() => setShowSettings(true)}
        className='absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700'
      >
        <Settings className='w-5 h-5' />
      </Button>

      {showSettings && (
        <SettingsDialog onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
};

export default SpeedTest;
