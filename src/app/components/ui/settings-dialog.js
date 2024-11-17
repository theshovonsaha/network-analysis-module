'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/Button';
import { Settings, Key, Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/app/components/ui/select';
import { Input } from '@/app/components/ui/input';

const AI_PROVIDERS = {
  mistral: { name: 'Mistral AI', color: 'blue' },
  claude: { name: 'Anthropic Claude', color: 'purple' },
  openai: { name: 'OpenAI', color: 'green' },
  gemini: { name: 'Google Gemini', color: 'yellow' },
};

const SettingsDialog = ({ onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState('');
  const [enableAI, setEnableAI] = useState(false);
  const [isKeySet, setIsKeySet] = useState(false);

  useEffect(() => {
    // Load saved settings
    const savedKey = localStorage.getItem('speedtest_api_key');
    const savedProvider = localStorage.getItem('speedtest_provider');
    const savedEnableAI =
      localStorage.getItem('speedtest_enable_ai') === 'true';

    if (savedKey) setIsKeySet(true);
    if (savedProvider) setProvider(savedProvider);
    setEnableAI(savedEnableAI);
  }, []);

  const handleSave = () => {
    if (enableAI && apiKey && provider) {
      localStorage.setItem('speedtest_api_key', apiKey);
      localStorage.setItem('speedtest_provider', provider);
      localStorage.setItem('speedtest_enable_ai', 'true');
    } else {
      localStorage.removeItem('speedtest_api_key');
      localStorage.removeItem('speedtest_provider');
      localStorage.setItem('speedtest_enable_ai', 'false');
    }
    onClose();
  };

  const clearSettings = () => {
    setApiKey('');
    setProvider('');
    setIsKeySet(false);
    localStorage.removeItem('speedtest_api_key');
    localStorage.removeItem('speedtest_provider');
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Speed Test Settings</DialogTitle>
          <DialogDescription>
            Configure speed test and AI analysis settings
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='flex items-center space-x-2'>
            <Label>Enable AI Analysis</Label>
            <Button
              variant={enableAI ? 'default' : 'outline'}
              size='sm'
              onClick={() => setEnableAI(!enableAI)}
            >
              {enableAI ? (
                <Check className='w-4 h-4' />
              ) : (
                <X className='w-4 h-4' />
              )}
            </Button>
          </div>

          {enableAI && (
            <>
              <div>
                <Label>AI Provider</Label>
                <Select value={provider} onValueChange={setProvider}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select AI provider' />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(AI_PROVIDERS).map(([key, { name }]) => (
                      <SelectItem key={key} value={key}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className='flex justify-between items-center'>
                  <Label>API Key</Label>
                  {isKeySet && (
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={clearSettings}
                      className='text-red-500 hover:text-red-700'
                    >
                      Clear
                    </Button>
                  )}
                </div>
                <Input
                  type='password'
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={isKeySet ? '••••••••' : 'Enter your API key'}
                />
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button onClick={handleSave}>Save Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
