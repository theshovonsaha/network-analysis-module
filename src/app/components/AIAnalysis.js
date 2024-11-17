import { motion } from 'framer-motion';
import {
  Activity,
  Zap,
  Target,
  AlertCircle,
  Wrench,
  Cpu,
  ArrowUp,
  Maximize,
  CheckCircle,
  AlertTriangle,
  Info,
  Settings2,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const iconMap = {
  'Connection Quality': CheckCircle,
  'Optimal Use Cases': Target,
  Limitations: AlertTriangle,
  Recommendations: Wrench,
  'Technical Insights': Info,
};

const MetricCard = ({ title, value, status, details }) => (
  <div className={`p-4 rounded-lg ${getStatusColor(status)}`}>
    <div className='flex justify-between items-center'>
      <h4 className='font-medium'>{title}</h4>
      <span className='text-sm font-semibold'>{value}</span>
    </div>
    <p className='text-sm mt-2 text-gray-400'>{details}</p>
  </div>
);

const Section = ({ icon: Icon, title, content, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    className='border border-gray-800 rounded-lg p-4 bg-gray-900/30 backdrop-blur-sm'
  >
    <div className='flex items-start space-x-3'>
      <div className='p-2 bg-gray-800 rounded-lg'>
        <Icon className='w-5 h-5 text-blue-400' />
      </div>
      <div className='flex-1'>
        <h3 className='font-semibold text-blue-400 mb-2'>{title}</h3>
        <div className='prose prose-invert max-w-none'>
          <ReactMarkdown
            components={{
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag='div'
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  </motion.div>
);

export function AIAnalysis({ analysis }) {
  const sections = parseAIAnalysis(analysis);

  return (
    <Card className='bg-gray-900/50 border-gray-800'>
      <CardHeader>
        <CardTitle className='text-xl flex items-center gap-2'>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Settings2 className='w-5 h-5 text-green-500' />
          </motion.div>
          AI Network Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-4'>
          {sections.map((section, index) => (
            <Section
              key={section.title}
              icon={iconMap[section.title] || Info}
              title={section.title}
              content={section.content}
              delay={index * 0.2}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function parseAIAnalysis(analysis) {
  const sections = [
    'Connection Quality',
    'Optimal Use Cases',
    'Limitations',
    'Recommendations',
    'Technical Insights',
  ];

  return sections.map((section) => {
    const content = extractSection(analysis, section);

    if (section === 'Technical Insights') {
      const insights = {};
      const lines = content.split('\n').filter((line) => line.trim());

      let currentTitle = '';
      let formattedContent = '';

      lines.forEach((line) => {
        if (line.includes(':')) {
          const [title, value] = line.split(':');
          currentTitle = title.trim();
          formattedContent += `**${currentTitle}**: ${value.trim()}\n\n`;
        } else if (currentTitle) {
          formattedContent += `${line.trim()}\n\n`;
        }
      });

      return {
        title: section,
        content: formattedContent.trim(),
      };
    }

    return {
      title: section,
      content:
        section === 'Connection Quality'
          ? content
          : extractBulletPoints(content),
    };
  });
}

function extractSection(text, currentSection) {
  const sectionRegex = new RegExp(
    `# ${currentSection}\\s*([\\s\\S]*?)(?=# |$)`,
    'i'
  );
  const match = text.match(sectionRegex);
  return match ? match[1].trim() : '';
}

function extractBulletPoints(text) {
  const points = text
    .split(/[•\*]/)
    .map((point) => point.trim())
    .filter((point) => point && point.length > 0);

  if (points.length <= 1) {
    return text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && line.length > 0)
      .join('\n\n');
  }

  return points.map((point) => `• ${point}`).join('\n\n');
}
