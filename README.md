# Professional Resume Builder

A modern, responsive resume builder application built with HTML, CSS, JavaScript, and Node.js. Create professional resumes with real-time preview and customizable themes.

## Features

### ✨ Core Features
- **Real-time Preview**: See your resume update as you type
- **Professional Templates**: Clean, modern resume layouts
- **Customizable Themes**: 6 color themes to choose from
- **Profile Image Upload**: Add your professional photo
- **PDF Export**: Download your resume as PDF
- **Print Ready**: Optimized for printing

### 📝 Resume Sections
- **Personal Information**: Contact details, links, and address
- **Professional Summary**: Brief career overview
- **Work Experience**: Job history with descriptions
- **Education**: Academic background
- **Projects**: Showcase your work with links
- **Skills**: Technical and professional skills
- **Soft Skills**: Personal attributes
- **Interests & Hobbies**: Personal interests

### 🎨 Customization Options
- **Color Themes**: Blue, Green, Purple, Red, Orange, Teal
- **Profile Image**: Upload and display your photo
- **Section Colors**: Customize individual section colors
- **Responsive Design**: Works on all devices

### 💾 Data Management (Server Features)
- **Save Resumes**: Store multiple resume versions
- **Load Resumes**: Access previously saved resumes
- **Export Data**: Download resume data as JSON
- **Image Upload**: Server-side image handling

## Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Quick Start

1. **Clone or Download** the project files
2. **Navigate** to the project directory
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Start the Server**:
   ```bash
   npm start
   ```
5. **Open Browser** and go to `http://localhost:3000`

### Development Mode
For development with auto-restart:
```bash
npm run dev
```

## File Structure

```
resume-builder/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # Frontend JavaScript
├── server.js           # Node.js server
├── package.json        # Dependencies
├── README.md           # Documentation
├── uploads/            # Uploaded images (created automatically)
└── saved-resumes/      # Saved resume data (created automatically)
```

## Usage Guide

### 1. Personal Information
- Fill in your basic contact details
- Add website and LinkedIn profile links
- Upload a professional profile photo
- Add soft skills and interests using the input fields

### 2. Professional Summary
- Write a brief overview of your career
- Keep it concise (500 characters max)
- Focus on your key strengths and goals

### 3. Work Experience
- Click "Add Experience" to add job entries
- Fill in job title, company, dates, and description
- Use bullet points for job descriptions
- Check "Currently working here" for current positions

### 4. Education
- Add your educational background
- Include institution, degree, field of study
- Add graduation dates and GPA (optional)

### 5. Projects
- Showcase your work and personal projects
- Add GitHub and live demo links
- Describe technologies used and key features

### 6. Skills
- Add technical and professional skills
- Press Enter or click "Add" to add skills
- Remove skills by clicking the × button

### 7. Customization
- Choose from 6 color themes
- Upload a profile image
- Customize individual section colors

### 8. Export & Print
- Use "Preview" to see print layout
- Use "Download PDF" to save as PDF
- Print directly from the browser

## API Endpoints

The server provides several API endpoints for data management:

- `POST /api/save-resume` - Save resume data
- `GET /api/load-resume/:id` - Load specific resume
- `GET /api/list-resumes` - List all saved resumes
- `DELETE /api/delete-resume/:id` - Delete a resume
- `GET /api/export-resume/:id` - Export resume as JSON
- `POST /api/upload-image` - Upload profile image

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Print & PDF Features

- Optimized print layout
- Professional formatting
- Proper page breaks
- High-quality output

## Customization

### Adding New Themes
Edit the `themes` object in `script.js`:
```javascript
const themes = {
    yourTheme: { 
        primary: '#your-color', 
        secondary: '#your-secondary', 
        light: '#your-light' 
    }
};
```

### Modifying Styles
Edit `styles.css` to customize:
- Layout and spacing
- Typography
- Colors and themes
- Responsive breakpoints

## Troubleshooting

### Common Issues

1. **Server won't start**
   - Check if Node.js is installed: `node --version`
   - Install dependencies: `npm install`
   - Check if port 3000 is available

2. **Images not uploading**
   - Check file size (max 2MB)
   - Ensure file is an image format
   - Check server permissions

3. **Print/PDF issues**
   - Use Chrome for best results
   - Check print settings
   - Ensure page size is set to A4/Letter

4. **Responsive issues**
   - Clear browser cache
   - Check viewport settings
   - Test on different devices

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Check the troubleshooting section
- Review the code comments
- Test with different browsers

## Version History

- **v1.0.0** - Initial release
  - Complete resume builder functionality
  - Real-time preview
  - Multiple themes
  - PDF export
  - Server-side data management

---

**Built with ❤️ using HTML, CSS, JavaScript, and Node.js**