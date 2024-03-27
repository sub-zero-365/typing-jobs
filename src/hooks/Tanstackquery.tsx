import React from 'react'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


 const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false
        },
        mutations:{}
    }
})

interface tanstackProps {
    children: React.ReactNode
}
const Tanstackquery = ({ children }: tanstackProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
    )
}

export default Tanstackquery