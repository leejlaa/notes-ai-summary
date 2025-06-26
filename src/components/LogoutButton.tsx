"use client"

import { useState } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { logOutAction } from '@/actions/users'

function LogoutButton() {
  const [loading, setLoading] = useState(false)
  const errorMessage = false
  const router = useRouter()

 const handleLogOut = async () => {
    setLoading(true);

    const { errorMessage } = await logOutAction();

    if (!errorMessage) {
        toast.success('You have successfully logged out.', {
            duration: 3000,
        });
      router.push(`/?toastType=logOut`);
    } else {
      toast.error(errorMessage, {
        duration: 3000,
        description: 'Please try again.',
      });
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  return (
    <Button onClick={handleLogOut} disabled={loading}>
      {loading ? <Loader2 className="animate-spin" /> : 'Logout'}
    </Button>
  )
}

export default LogoutButton
