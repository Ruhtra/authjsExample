import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';

export default function NewVerification() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const onSubmit = useCallback(() => {
        console.log(token);
        
    }, [])

    useEffect(() => {
        onSubmit();
    }, [onsubmit])

    return (
        <div>
            <h1>New Verification Page</h1>
            {/* Add your verification logic here */}
        </div>
    );
};
