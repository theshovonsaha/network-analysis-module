import {
  Wifi,
  Gamepad,
  Video,
  Phone,
  Home,
  Download,
  Upload,
  Zap,
  Activity,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';

const icons = {
  gaming: Gamepad,
  streaming: Video,
  video_calls: Phone,
  smart_devices: Home,
  downloads: Download,
};

const statusColors = {
  Good: 'text-green-500',
  Fair: 'text-yellow-500',
  Poor: 'text-red-500',
};

export function NetworkAnalysis({ analysis }) {
  return (
    <Card className='bg-gray-900/50 border-gray-800'>
      <CardHeader>
        <CardTitle className='text-xl flex items-center gap-2'>
          <Wifi className='w-5 h-5 text-blue-500' />
          Network Performance Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {Object.entries(analysis).map(([key, data]) => {
            const Icon = icons[key];
            return (
              <div
                key={key}
                className='flex items-start space-x-3 p-3 rounded-lg bg-gray-800/50'
              >
                <Icon className='w-5 h-5 mt-1 text-gray-400' />
                <div>
                  <div className='flex items-center space-x-2'>
                    <h3 className='font-medium capitalize'>
                      {key.replace('_', ' ')}
                    </h3>
                    <span
                      className={`text-sm font-semibold ${
                        statusColors[data.status]
                      }`}
                    >
                      {data.status}
                    </span>
                  </div>
                  <p className='text-sm text-gray-400'>{data.details}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
