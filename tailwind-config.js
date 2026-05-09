// Tailwind CSS CDN Configuration for Vintage Car Restoration Shop
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          light: 'var(--primary-light)',
          dark: 'var(--primary-dark)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          light: 'var(--secondary-light)',
          dark: 'var(--secondary-dark)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          light: 'var(--accent-light)',
          dark: 'var(--accent-dark)',
        },
        txtdark: 'var(--text-dark)',
        txtlight: 'var(--text-light)',
        danger: 'var(--danger)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        info: 'var(--info)',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%)',
        'gradient-accent': 'linear-gradient(135deg, #c8a951 0%, #e8d48b 100%)',
        'gradient-hero': 'linear-gradient(135deg, #1a1a2e 0%, #c8a951 100%)',
        'gradient-gold': 'linear-gradient(135deg, #c8a951 0%, #b89a3d 50%, #d4bc6e 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'glass-lg': '0 12px 48px rgba(0, 0, 0, 0.15)',
        'gold': '0 4px 20px rgba(200, 169, 81, 0.3)',
        'gold-lg': '0 8px 40px rgba(200, 169, 81, 0.4)',
        'card': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 12px 40px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(200, 169, 81, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(200, 169, 81, 0.6)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
};
