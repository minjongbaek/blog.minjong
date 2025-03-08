import "@/styles/app.css";

const ResumeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body>
        <div className="container mx-auto flex min-h-screen max-w-2xl flex-col px-4 pt-8">
          <main className="grow">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default ResumeLayout;
