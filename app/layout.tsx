import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Silkscreen } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const silkscreen = Silkscreen({
  subsets: ['latin'],
  variable: '--font-silkscreen',
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'XD VERSE | Minecraft Gaming Community',
  description:
    'Discover huge worlds without any boundaries full of fun and millions of friends in XD VERSE.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#431278',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background transition-colors duration-300" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function applyTheme(isDark) {
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                }

                try {
                  var saved = localStorage.getItem('xd-theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  var initialDark = saved === 'dark' || (!saved && supportDarkMode);
                  applyTheme(initialDark);
                } catch (e) {}

                window.__toggleTheme = function() {
                  try {
                    var isDark = document.documentElement.classList.contains('dark');
                    var nextDark = !isDark;
                    applyTheme(nextDark);
                    localStorage.setItem('xd-theme', nextDark ? 'dark' : 'light');
                    window.dispatchEvent(new CustomEvent('xd-theme-change', { detail: nextDark ? 'dark' : 'light' }));
                  } catch (e) {}
                };

                if (typeof document !== 'undefined') {
                  document.addEventListener('click', function(e) {
                    var btn = e.target ? e.target.closest('.xd-theme-toggle-btn') : null;
                    if (btn) {
                      window.__toggleTheme();
                    }
                  });
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${plusJakarta.variable} ${silkscreen.variable} font-sans antialiased bg-[#e5dfd3] dark:bg-[#0b0d12] text-stone-900 dark:text-stone-100 transition-colors duration-300`}>
        {children}
      </body>
    </html>
  )
}
