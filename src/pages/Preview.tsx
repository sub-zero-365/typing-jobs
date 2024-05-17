import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs.js"
import { Scrollable } from "../components/Scrollable"

const Preview = () => {
  return (
    <div>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className='sticky top-16'>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>

    </div>
  )
}

export default Preview