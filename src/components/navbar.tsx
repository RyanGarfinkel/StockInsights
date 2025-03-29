import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from './ui/button';
import { Label } from './ui/label';

const Navbar = () => {
    
    const { user } = useUser();

    const handleLogout = () => {
        window.location.href = '/api/auth/logout';
    }

    return (
        <div className='flex justify-between w-full'>
            <Label className='text-lg'>
                { `Welcome, ${user?.name}!` }
            </Label>
            <Button onClick={() => handleLogout()}>
                Logout
            </Button>
        </div>
    );
};

export default Navbar;