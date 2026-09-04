import UploadTabs from "@/components/upload/UploadTabs";

export default function HomePage() {
  return (
    <div className="py-2 sm:py-6">
      {/* Page Header */}
      <div className="text-center mb-6 sm:mb-10 px-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
          Business Card Scanner
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
          Upload a business card by scanning, PDF, or URL. We will extract the details automatically.
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8">
        <UploadTabs />
      </div>
    </div>
  );
}
