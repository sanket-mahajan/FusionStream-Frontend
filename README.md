# Fusion Stream - Frontend

Fusion Stream is a MERN stack web application that combines the functionalities of YouTube and Twitter, allowing users to upload & watch videos, post & interact with tweets, and manage their profiles.

## 🚀 Features

- 📹 Upload and watch videos (Stored via Cloudinary)
- 📝 Post and interact with tweets
- 🔍 Search for videos and tweets
- 📌 User authentication and profiles
- 🎨 Styled with Tailwind CSS
- 📱 Fully responsive design

## 📂 Project Structure

```
/src
│── components/         # Reusable UI components
│── pages/              # Application pages
│── common/             # Navbar, Footer, Sidebar
│── api/                # API service functions
│── redux/              # Centralized Store
│── App.jsx             # Root application file
│── main.jsx            # Entry point
```

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **State Management:** React Hooks, Redux
- **Media Storage:** Cloudinary
- **Routing:** React Router

## 📦 Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/fusion-stream-frontend.git
   ```
2. Navigate to the frontend directory:
   ```sh
   cd fusion-stream-frontend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## 🔗 API Configuration

Create a `.env` file in the root directory and add the following:

```
VITE_BACKEND_URL=http://localhost:5000
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

## 📜 Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the built project

## 📄 License

This project is licensed under the MIT License.
