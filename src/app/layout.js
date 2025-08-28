export const metadata = {
  title: 'React App',
  description: 'Web site created with Next.js.',
  icons: {
    icon: "./favicon.ico", // path relative to /public
  },
}
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
