

import RegForm from './components/RegForm';
import logo from '@/assets/gosend_logo.png';
import bg from '@/assets/gosend_bg.jpg';
import { Link } from "react-router-dom";

export default function CreateAccount() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md text-primary-foreground">
              
              <img src={logo} alt="Logo" className="h-full w-full object-contain" />
              </div>
            GoSend+
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={bg}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
