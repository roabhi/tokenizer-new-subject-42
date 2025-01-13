'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ConnectKitButton } from 'connectkit'

export default function Header() {
  return (
    <header className="w-full px-[2.760416667%]">
      <div className="flex justify-between items-center h-20 max-w-container mx-auto">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/LogoTokenizer.svg"
              alt="Tokenizer Logo"
              width={42}
              height={45}
              className="w-[2.625rem] h-[2.8125rem]"
            />
          </Link>
          <span className="ml-[1.625rem] text-[1.875rem] font-medium">
            Tokenizer - 42 v.1
          </span>
        </div>
        
        <nav className="flex gap-8">
          <Link href="/about" className="hover:text-opacity-80">
            About
          </Link>
          <Link href="#" className="hover:text-opacity-80">
            Github
          </Link>
          <Link href="https://faucet.polygon.technology/" className="hover:text-opacity-80" target='_blank'>
            Faucet
          </Link>
        </nav>

        <ConnectKitButton 
          customTheme={{
            "--ck-connectbutton-background": "#FFD166",
            "--ck-connectbutton-color": "#202537",
            "--ck-connectbutton-hover-background": "#FFB866",
            "--ck-connectbutton-active-background": "#FFB866",
            "--ck-connectbutton-font-family": "Space Grotesk",
          }}
          showBalance={false}
        />
      </div>
    </header>
  )
}