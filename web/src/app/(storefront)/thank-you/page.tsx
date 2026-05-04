interface ThankYouPageProps {
  searchParams: Promise<{ orderId?: string }>;
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const { orderId } = await searchParams;
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
      <h1 className="font-headline text-3xl text-primary">Thank you</h1>
      <p className="mt-4 text-on-surface-variant">
        {orderId ? (
          <>
            Order <span className="font-mono text-on-surface">{orderId}</span> is confirmed.
          </>
        ) : (
          "Your order is confirmed."
        )}
      </p>
    </div>
  );
}
