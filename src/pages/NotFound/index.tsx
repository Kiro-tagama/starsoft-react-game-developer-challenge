export default function NotFound() {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-center">404 Page not found</h1>
      <br />
      <a
        href="/"
        className="text-center text-2xl p-2 border rounded-md text-emerald-50 border-emerald-50 hover:bg-emerald-50 hover:text-emerald-950"
      >
        Back to home
      </a>
    </div>
  );
}
