interface ShellProps {
    children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
    return (
        <div className="min-h-screen bg-background">
            <main className="flex-1">{children}</main>
        </div>
    );
}