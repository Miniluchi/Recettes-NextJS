import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { Home, List, Plus } from "lucide-react";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <nav className="fixed top-8 right-8 z-50 flex gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-full p-3 shadow-lg">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/recipes">
              <List className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/recipes/new">
              <Plus className="h-4 w-4" />
            </Link>
          </Button>
        </nav>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
