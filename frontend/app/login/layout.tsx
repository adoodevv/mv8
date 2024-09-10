import type { Metadata } from 'next'

export const metadata: Metadata = {
   title: 'NETFLIX - Login',
   description: 'Watch your favorite movies and TV shows on Netflix.',
}

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <div className='relative h-full w-full'>
         {children}
      </div>
   )
}