import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function Contact() {
  return (
    <section className="w-full bg-background py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-green-400 text-center">Get in Touch</h2>
        <form className="max-w-md mx-auto">
          <div className="mb-4">
            <Input type="text" placeholder="Your Name" />
          </div>
          <div className="mb-4">
            <Input type="email" placeholder="Your Email" />
          </div>
          <div className="mb-4">
            <Textarea placeholder="Your Message" rows={4} />
          </div>
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Send Message</Button>
        </form>
      </div>
    </section>
  )
}

