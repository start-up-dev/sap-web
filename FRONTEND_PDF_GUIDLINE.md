Frontend Integration Guide: PDF Downloads

The platform uses Private GCS Buckets for security. This means the PDF URL stored in the
database is just an object path (e.g., reports/scan_123.pdf), not a public link. To allow
users to download it, you must use the Signed URL endpoint.

1. The Data Structure
   When you fetch a scan's details from GET /api/scans/{scan_id}, the response includes a
   report object. If a PDF was successfully generated, it will have a pdf_url (which is the
   internal GCS path):

   1 {
   2 "id": 123,
   3 "status": "completed",
   4 "report": {
   5 "score": 85,
   6 "pdf_url": "reports/scan_123_1712345678.pdf"
   7 }
   8 }

2. Getting the Download Link
   Do not try to link directly to the pdf_url value. Instead, use the dedicated report router
   to generate a temporary download link (valid for 60 minutes):

Endpoint: GET /api/reports/{scan_id}/download

Example Request:

    1 const response = await fetch(`${API_URL}/api/reports/${scanId}/download`, {
    2 headers: {
    3 'Authorization': `Bearer ${clerkToken}`
    4 }
    5 });
    6
    7 const data = await response.json();
    8 // data.download_url will be a signed Google Cloud Storage link
    9 window.open(data.download_url, '\_blank');

3. Implementation Details
   I have verified the backend logic in api/routers/reports.py. It fetches the pdf_url from
   the database and uses the gcs_service to sign it:

   1 # api/routers/reports.py snippet
   2 @router.get("/{scan_id}/download")
   3 async def get_report_download_link(scan_id: int, db: AsyncSession = Depends(get_db)):
   4 # ... logic to find report ...
   5 if not report.pdf_url:
   6 raise HTTPException(status_code=404, detail="PDF report not ready")
   7
   8 signed_url = generate_signed_url(report.pdf_url)
   9 return {"download_url": signed_url}

Summary of Storage

- Database (`reports` table): Stores the internal path (e.g., reports/file.pdf).
- Storage (GCS): The actual file resides in your private bucket.
- Frontend: Always requests a "Signed URL" via the API to give the user access.
