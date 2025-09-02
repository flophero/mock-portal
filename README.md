# Customer Service Portal

A modern, responsive Customer Service Portal built with React, TypeScript, and Tailwind CSS. This application provides comprehensive job management, alert systems, and customer service tools for field service operations.

## 🚀 Features

- **Job Management**: Create, view, edit, and track service jobs
- **5-Step Job Logging Wizard**: Streamlined job creation process
- **Real-time Alerts**: Inline alert system with toast notifications
- **Customer Dashboard**: Customer-specific job views and management
- **Engineer Management**: Track engineer availability and assignments
- **SLA Monitoring**: Automated status tracking (Green/Amber/Red)
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Built with Shadcn/UI components and Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **UI Components**: Shadcn/UI, Radix UI
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Hooks
- **Notifications**: Sonner
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/customer-service-portal.git
   cd customer-service-portal
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🚀 Deployment

### GitHub Pages (Free Hosting)

1. **Install gh-pages**
   ```bash
   pnpm install --save-dev gh-pages
   ```

2. **Update package.json homepage**
   ```json
   "homepage": "https://yourusername.github.io/customer-service-portal"
   ```

3. **Deploy to GitHub Pages**
   ```bash
   pnpm run deploy
   ```

### Other Deployment Options

- **Vercel**: Connect your GitHub repo to Vercel for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect your GitHub repo
- **AWS S3**: Upload the `dist` folder to an S3 bucket with static hosting

## 📱 Usage

### Job Management
- Click "Log New Job" to start the 5-step job creation wizard
- View all jobs on the master dashboard with filtering and search
- Click on any job card to view detailed information and edit

### Alert System
- Create alerts for SLA violations (Accept, On-site, Complete)
- Alerts appear inline on job cards with red highlighting
- Acknowledge alerts to mark them as resolved

### Customer Portal
- Select a customer to view their specific jobs
- Access customer-specific alerts and notifications
- Manage customer-specific job assignments

## 🎨 Customization

### Adding New Job Categories
Edit `src/types/job.ts` to add new categories:
```typescript
category: 'Electrical' | 'Mechanical' | 'Plumbing' | 'HVAC' | 'General' | 'YourNewCategory';
```

### Modifying SLA Times
Update the `CustomAlerts` interface in `src/types/job.ts`:
```typescript
export interface CustomAlerts {
  acceptSLA: number; // minutes
  onsiteSLA: number; // minutes
  completedSLA: number; // minutes
}
```

### Styling Changes
- Modify `src/index.css` for global styles
- Update Tailwind classes in components for specific styling
- Customize Shadcn/UI components in `src/components/ui/`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/UI components
│   ├── MasterDashboard.tsx
│   ├── CustomerDashboard.tsx
│   ├── JobLogWizard.tsx
│   └── ...
├── pages/              # Main application pages
│   ├── Index.tsx
│   └── JobDetailPage.tsx
├── types/              # TypeScript type definitions
│   └── job.ts
├── lib/                # Utility functions
│   └── jobUtils.ts
└── App.tsx             # Main application component
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Shadcn/UI](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the fast build tool
- [React](https://react.dev/) for the amazing frontend library

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Review the code comments

---

**Built with ❤️ for better customer service management**