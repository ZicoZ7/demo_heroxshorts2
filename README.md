# HeroxShorts - AI-Powered Video Creation Platform

Transform your content with AI-powered video creation tools. Create engaging short-form content, generate AI voices, design thumbnails, and much more - all in one platform.

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.0.2-black.svg)
![React](https://img.shields.io/badge/React-18.3.1-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)

## Overview

HeroxShorts is a comprehensive AI-powered platform designed to help content creators transform their ideas into engaging videos. Built with Next.js 15 and powered by cutting-edge AI technologies, it offers 8 powerful features for video creation, editing, and enhancement.

## Key Features

### 1. **Long to Short Conversion**
Convert long-form videos into viral short-form content with advanced customization options:
- Multiple layout options (AUTO, FILL, FIT, FRAME, GAMIFY)
- 4+ caption styling presets
- Automatic language detection or English translation
- GIF effect overlays (7+ effects available)
- Support for YouTube URLs and direct uploads

### 2. **Long to Long Processing**
Process and optimize long-form videos while maintaining quality:
- Preserve original video quality
- Optional B-roll integration
- Video optimization for different platforms

### 3. **Clip Any Moment**
Extract specific moments from your videos with precision:
- Custom prompt-based clip extraction
- Support for YouTube and uploaded videos
- Multiple export format options

### 4. **AI Voice Generator**
Generate natural-sounding AI voices from text:
- 6 voice options: Alloy, Echo, Fable, Onyx, Nova, Shimmer
- Real-time voice generation
- Buffered audio playback system
- Text-to-speech powered by advanced AI

### 5. **Thumbnail Generator**
Create eye-catching thumbnails with AI:
- Multiple style variations
- Customizable aspect ratios
- AI-powered design suggestions
- Thumbnail history and management

### 6. **Turn Ideas to Video**
Transform text prompts into complete videos:
- Text-to-video generation
- Image model selection (Flux, Turbo)
- Voice-over integration
- B-roll sourcing from Pexels or AI generation

### 7. **Add B-Roll**
Enhance your videos with professional B-roll footage:
- Source from Pexels stock library
- AI-generated B-roll options
- Full screen or fill display modes
- Seamless integration with existing videos

### 8. **My Projects**
Manage all your video projects in one place:
- Project status tracking (Uploading, Processing, Completed, Failed)
- Real-time processing progress
- Preview and download outputs
- Project history and organization

## Tech Stack

### Core Framework
- **Next.js 15.0.2** - React framework with App Router
- **React 18.3.1** - UI library
- **TypeScript 5.3.3** - Type-safe development

### Styling & UI
- **Tailwind CSS 3.3.6** - Utility-first CSS framework
- **shadcn/ui** - 40+ accessible UI components
- **Framer Motion 11.11.11** - Animation library
- **Material-UI 6.1.9** - Component library
- **Lucide React 0.294.0** - Icon library

### AI & Content Processing
- **Google Generative AI** - AI-powered content generation
- **FFmpeg** - Video processing and encoding
- **AssemblyAI 4.8.0** - Speech-to-text transcription
- **ytdl-core 4.11.5** - YouTube video downloading

### Media & Video
- **Video.js 8.21.0** - HTML5 video player
- **react-dropzone 14.3.5** - File upload handling
- **Canvas-confetti 1.9.3** - Celebration effects

### State Management
- **TanStack React Query 5.62.0** - Server state management
- **next-themes 0.4.3** - Theme management (dark/light mode)

### Utilities
- **Axios 1.7.7** - HTTP client
- **Winston 3.17.0** - Logging
- **date-fns 4.1.0** - Date manipulation
- **js-cookie 3.0.5** - Cookie management

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/demo_heroxshorts2.git
cd demo_heroxshorts2
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
npm run build
# or
yarn build
```

This will create an optimized static export in the `out` directory, suitable for deployment on GitHub Pages or any static hosting service.

## Project Structure

```
demo_heroxshorts2/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── Home/              # Dashboard
│   │   ├── LongtoShort/       # Video conversion
│   │   ├── GenVoice/          # AI voice generation
│   │   ├── ThumbnailGenerator/# Thumbnail creation
│   │   ├── MyProjects/        # Project management
│   │   └── ...                # Other feature pages
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── landing/          # Landing page components
│   │   └── providers/        # Context providers
│   ├── lib/                   # Utilities and helpers
│   │   ├── styles/           # Caption & GIF styles
│   │   ├── types/            # TypeScript type definitions
│   │   └── utils/            # Helper functions
│   ├── hooks/                 # Custom React hooks
│   └── types/                 # Global type definitions
├── public/                    # Static assets
│   ├── creators/             # Creator images
│   ├── showcase/             # Marketing images
│   └── fonts/                # Custom fonts & GIFs
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## Features in Detail

### Caption Styles
Choose from 12+ professional caption styles:
- Modern, Bold, Neon variants
- Customizable fonts, colors, and positions
- Pro and New style options

### GIF Effects Library
Add dynamic effects to your videos:
- 7+ pre-built GIF effects
- Professional animations
- Easy integration with video content

### Credit System
The platform uses a credit-based system across features:
- Video Processing Credits
- GenVoice Credits
- B-Roll Credits
- AI Image Credits
- AI Video Credits
- Clip Credits
- GenMusic Credits
- GenDubbing Credits

**Available Plans:**
- FREE - Basic credits for testing
- STARTER - Entry-level content creation
- PRO - Professional tier with higher limits
- ENTERPRISE - Custom enterprise solutions
- LIFETIME - Unlimited access

### Multi-Platform Support
Extract content from multiple platforms:
- YouTube (regular and Shorts)
- Instagram
- TikTok
- Direct video uploads

## Configuration

### Environment Variables
The application supports various configuration options. Create a `.env.local` file for local development:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

### Theme Customization
The app supports dark mode by default. Theme settings are managed through:
- [next-themes](https://github.com/pacocoursey/next-themes)
- CSS variables in [globals.css](src/app/globals.css)
- Tailwind dark mode classes

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style
- ESLint configuration for Next.js
- TypeScript strict mode enabled
- Prettier-compatible formatting

## Deployment

This project is configured for static export and can be deployed to:
- **GitHub Pages** (current configuration with base path: `/demo_heroxshorts2`)
- **Vercel** - Recommended for Next.js apps
- **Netlify** - Alternative static hosting
- Any static file hosting service

### Deploy on Vercel
The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/demo_heroxshorts2)

### Deploy on GitHub Pages
The project is pre-configured for GitHub Pages deployment. Simply push to your repository and enable GitHub Pages in settings.

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Modern mobile browsers

**Note:** Some features require modern browser APIs and may not work in older browsers.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial
- [Next.js GitHub](https://github.com/vercel/next.js) - Next.js repository

### UI Components
- [shadcn/ui Documentation](https://ui.shadcn.com/) - Accessible component library
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- **Creator:** Sharif Zafar
- Built with [Next.js](https://nextjs.org)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Powered by various AI technologies
- Special thanks to all open-source contributors

## Support

For support, questions, or feedback:
- Open an issue on GitHub
- Contact: [Your contact information]
- Documentation: [Project documentation link]

---

**Made with ❤️ using Next.js and AI**
