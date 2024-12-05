const eventDetailsHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Ticket Details</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #085ce4;
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            color: black;
        }
        .content p {
            margin: 8px 0;
        }
        .qr-link {
            display: block;
            margin: 20px auto;
            padding: 10px 15px;
            text-align: center;
            background-color: #085ce4;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            width: fit-content;
        }
        .qr-link:hover {
            background-color: #064bb1;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Event Details</h1>
        </div>
        <div class="content">
            <p><strong>Venue:</strong> {venue}</p>
            <p><strong>Address:</strong> {address}</p>
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Description:</strong> {description}</p>
        </div>
        <a class="qr-link" href="{qrCode}" target="_blank">View Event QR Code</a>
    </div>
</body>
</html>
`;

export default eventDetailsHtml;
