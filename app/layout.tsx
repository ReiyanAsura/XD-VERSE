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
                try {
                  var saved = localStorage.getItem('xd-theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (saved === 'dark' || (!saved && supportDarkMode)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }

                  if (typeof document !== 'undefined') {
                    document.addEventListener('click', function(e) {
                      var toggleBtn = e.target ? e.target.closest('.xd-theme-toggle-btn') : null;
                      if (toggleBtn) {
                        var isDark = document.documentElement.classList.contains('dark');
                        var nextTheme = isDark ? 'light' : 'dark';
                        if (nextTheme === 'dark') {
                          document.documentElement.classList.add('dark');
                          localStorage.setItem('xd-theme', 'dark');
                        } else {
                          document.documentElement.classList.remove('dark');
                          localStorage.setItem('xd-theme', 'light');
                        }
                        window.dispatchEvent(new CustomEvent('xd-theme-change', { detail: nextTheme }));
                      }
                    });
                  }
                } catch (e) {}
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
