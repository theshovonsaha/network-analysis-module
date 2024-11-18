# Network Analysis Module

A sophisticated network speed testing and analysis tool built with Next.js and FastAPI. Get comprehensive insights about your internet connection with AI-powered analysis.

## 🚀 Live Demo

Check out the live application: [https://rawspeedtest.netlify.app/](https://rawspeedtest.netlify.app/)

## ✨ Features

- Real-time speed testing for download, upload, and latency
- AI-powered network analysis with multiple provider support:
  - Mistral AI
  - Google Gemini
  - Anthropic Claude
  - OpenAI
- Detailed system metrics and performance insights
- Network stability analysis
- Gaming and streaming optimization recommendations
- Raw data export functionality
- Beautiful, responsive UI with dark mode

## 🛠 Tech Stack

- **Frontend**: Next.js, React, TailwindCSS, Framer Motion
- **Backend**: FastAPI, Python
- **AI Integration**: Multiple AI provider SDKs
- **Network Tools**: speedtest-cli, psutil, netifaces
- **Deployment**: Netlify (Frontend), Render (Backend)

## 🚦 Getting Started

1. Clone the repository:
   bash
   git clone https://github.com/yourusername/network-analysis-module.git
   cd network-analysis-module

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file with:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## 🔧 Configuration

The application supports multiple AI providers for network analysis. You can configure your preferred provider and API key in the settings panel.

## 📦 Deployment

The project is configured for deployment on Netlify (frontend) and Render (backend). Check the following configuration files for deployment settings:

- [Netlify configuration](./netlify.toml)
- [Render configuration](./backend/config/settings.py)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Shovon Saha - [@theshovonsaha](https://www.theshovonsaha.com)

## 🙏 Acknowledgments

- FastAPI for the excellent web framework
- All AI providers for their powerful APIs
- The open-source community for various tools and libraries
