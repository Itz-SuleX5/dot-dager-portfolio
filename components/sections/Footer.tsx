import { Github, Twitter, Linkedin } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-green-600 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="mb-4 md:mb-0">&copy; 2024 Dot Dager. All rights reserved.</p>
          <div className="flex gap-4">
            <Link
              href="https://github.com/MarianoVilla"
              target="_blank"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" aria-hidden="true" />
            </Link>
            <Link
              href="https://twitter.com/Dager_32"
              target="_blank"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" aria-hidden="true" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/mariano-luis-villa/?locale=en_US"
              target="_blank"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
