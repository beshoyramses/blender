export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="bg-landing bg-no-repeat bg-cover bg-center">
          {children}
      </main>
    );
  }
  