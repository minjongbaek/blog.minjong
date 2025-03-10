import "@/styles/app.css";

const ResumeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body>
        <div className="resume container mx-auto flex min-h-screen max-w-3xl flex-col p-6">
          <main className="grow">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default ResumeLayout;
