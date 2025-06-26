import React from 'react'
import { Card, CardHeader } from '@/components/ui/card'
import { CardTitle } from '@/components/ui/card'
import AuthForm from '@/components/AuthForm'

export default function page() {
  return (
     <div className="mt-20 flex flex-1 flex-col items-center">
        <Card  className="w-full max-w-md">
            <CardHeader className="md-4">
                <CardTitle className="text-3xl text-center">
                    Sign-up Page  
                </CardTitle>

            </CardHeader>
        
            <AuthForm type='signUp' />
        </Card>
    </div>
  )
}
