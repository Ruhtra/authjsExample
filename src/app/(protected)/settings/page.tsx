import { auth } from "@/auth";

export default async function SettingsPage() {
    const session = await auth()
    return (
        <div>
            {JSON.stringify(session)}

            <h1>Settings</h1>
            <p>Manage your account settings here.</p>
        </div>
    );
};