// Global variables
let currentStep = 1;
let totalSteps = 7;
let currentTheme = 'blue';
let currentTemplate = 'modern';
let colorIntensity = 1;
let profileImageSrc = '';
let experienceList = [];
let educationList = [];
let projectsList = [];
let skillsList = [];
let softSkillsList = [];
let interestsList = [];

// Theme colors
const themes = {
    blue: { primary: '#2563eb', secondary: '#1d4ed8', light: '#eff6ff' },
    green: { primary: '#16a34a', secondary: '#15803d', light: '#f0fdf4' },
    purple: { primary: '#9333ea', secondary: '#7c3aed', light: '#faf5ff' },
    red: { primary: '#dc2626', secondary: '#b91c1c', light: '#fef2f2' },
    orange: { primary: '#ea580c', secondary: '#c2410c', light: '#fff7ed' },
    teal: { primary: '#0d9488', secondary: '#0f766e', light: '#f0fdfa' }
};

// Function to adjust color intensity
function adjustColorIntensity(color, intensity) {
    // Convert hex to RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Adjust intensity (blend with white for lighter, with black for darker)
    let newR, newG, newB;
    if (intensity < 1) {
        // Lighter (blend with white)
        newR = Math.round(r + (255 - r) * (1 - intensity));
        newG = Math.round(g + (255 - g) * (1 - intensity));
        newB = Math.round(b + (255 - b) * (1 - intensity));
    } else {
        // Keep original color at intensity 1
        newR = r;
        newG = g;
        newB = b;
    }
    
    // Convert back to hex
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Wizard initialized');
    initializeEventListeners();
    updateProgress();
    updateNavigation();
    // Initial preview update with delay to ensure DOM is ready
    setTimeout(() => {
        updatePreview();
    }, 100);
});

function initializeEventListeners() {
    // Navigation buttons
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextStep);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevStep);
    }

    // Template selection
    const templateCards = document.querySelectorAll('.template-card');
    templateCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('Template selected:', this.dataset.template);
            templateCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            currentTemplate = this.dataset.template;
            updatePreview();
        });
    });

    // Theme selection
    const themeColors = document.querySelectorAll('.theme-color');
    themeColors.forEach(color => {
        color.addEventListener('click', function() {
            console.log('Theme selected:', this.dataset.theme);
            themeColors.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            currentTheme = this.dataset.theme;
            updatePreview();
        });
    });

    // Color intensity slider
    const intensitySlider = document.getElementById('colorIntensity');
    if (intensitySlider) {
        intensitySlider.addEventListener('input', function() {
            colorIntensity = parseFloat(this.value);
            console.log('Color intensity:', colorIntensity);
            updatePreview();
        });
    }

    // Image upload
    const imageInput = document.getElementById('imageInput');
    if (imageInput) {
        imageInput.addEventListener('change', handleImageUpload);
    }

    // Form inputs
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', updatePreview);
        input.addEventListener('change', updatePreview);
    });

    // Add buttons
    const addExperienceBtn = document.getElementById('addExperienceBtn');
    if (addExperienceBtn) {
        addExperienceBtn.addEventListener('click', addExperience);
    }

    const addEducationBtn = document.getElementById('addEducationBtn');
    if (addEducationBtn) {
        addEducationBtn.addEventListener('click', addEducation);
    }

    const addProjectBtn = document.getElementById('addProjectBtn');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', addProject);
    }

    const addSkillBtn = document.getElementById('addSkillBtn');
    if (addSkillBtn) {
        addSkillBtn.addEventListener('click', addSkill);
    }

    // Skill inputs
    const skillInput = document.getElementById('skillInput');
    if (skillInput) {
        skillInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSkill();
            }
        });
    }

    const softSkillInput = document.getElementById('softSkillInput');
    if (softSkillInput) {
        softSkillInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSoftSkill();
            }
        });
    }

    const interestInput = document.getElementById('interestInput');
    if (interestInput) {
        interestInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addInterest();
            }
        });
    }

    // Header buttons
    const previewBtn = document.getElementById('previewBtn');
    if (previewBtn) {
        previewBtn.addEventListener('click', function() {
            window.print();
        });
    }

    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            window.print();
        });
    }

    // Final buttons
    const finalPreviewBtn = document.getElementById('finalPreviewBtn');
    if (finalPreviewBtn) {
        finalPreviewBtn.addEventListener('click', function() {
            window.print();
        });
    }

    const finalDownloadBtn = document.getElementById('finalDownloadBtn');
    if (finalDownloadBtn) {
        finalDownloadBtn.addEventListener('click', function() {
            window.print();
        });
    }

    // Character count for summary
    const summaryInput = document.getElementById('summary');
    const summaryCount = document.getElementById('summaryCount');
    if (summaryInput && summaryCount) {
        summaryInput.addEventListener('input', function() {
            summaryCount.textContent = this.value.length;
        });
    }

    // Initialize empty states
    renderSkillsTags();
    renderSoftSkillsTags();
    renderInterestsTags();
}

function nextStep() {
    if (currentStep < totalSteps) {
        // Validate current step
        if (validateStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
            updateProgress();
            updateNavigation();
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        updateProgress();
        updateNavigation();
    }
}

function showStep(step) {
    // Hide all steps
    const steps = document.querySelectorAll('.wizard-step');
    steps.forEach(s => s.classList.remove('active'));
    
    // Show current step
    const currentStepEl = document.getElementById(`step${step}`);
    if (currentStepEl) {
        currentStepEl.classList.add('active');
    }
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressSteps = document.querySelectorAll('.step');
    
    // Update progress bar
    const progressPercent = (currentStep / totalSteps) * 100;
    if (progressFill) {
        progressFill.style.width = `${progressPercent}%`;
    }
    
    // Update step indicators
    progressSteps.forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNumber === currentStep) {
            step.classList.add('active');
        } else if (stepNumber < currentStep) {
            step.classList.add('completed');
        }
    });
}

function updateNavigation() {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    // Show/hide previous button
    if (prevBtn) {
        prevBtn.style.display = currentStep > 1 ? 'flex' : 'none';
    }
    
    // Update next button text
    if (nextBtn) {
        if (currentStep === totalSteps) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'flex';
            nextBtn.innerHTML = currentStep === totalSteps - 1 ? 
                'Finish <i class="fas fa-check"></i>' : 
                'Next <i class="fas fa-arrow-right"></i>';
        }
    }
}

function validateStep(step) {
    switch(step) {
        case 1:
            return true; // Template selection is optional
        case 2:
            // Validate personal information
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const location = document.getElementById('location').value.trim();
            
            if (!fullName || !email || !phone || !location) {
                alert('Please fill in all required fields (Full Name, Email, Phone, Location)');
                return false;
            }
            return true;
        case 3:
            // Summary is optional but recommended
            return true;
        case 4:
            // Experience is optional
            return true;
        case 5:
            // Education is optional
            return true;
        case 6:
            // Skills are optional
            return true;
        default:
            return true;
    }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileImageSrc = e.target.result;
            
            // Update image preview
            const imagePreview = document.getElementById('imagePreview');
            if (imagePreview) {
                imagePreview.innerHTML = `<img src="${profileImageSrc}" alt="Profile">`;
            }
            
            updatePreview();
        };
        reader.readAsDataURL(file);
    }
}

function updatePreview() {
    const previewContainer = document.getElementById('resumePreview');
    if (!previewContainer) {
        console.log('Preview container not found');
        return;
    }

    try {
        // Get form data
        const formData = getFormData();
        console.log('Form data:', formData);
        
        // Generate resume HTML
        const resumeHTML = generateResumeHTML(formData);
        
        // Update preview
        previewContainer.innerHTML = resumeHTML;
        console.log('Preview updated successfully');
    } catch (error) {
        console.error('Error updating preview:', error);
        previewContainer.innerHTML = '<div style="padding: 2rem; text-align: center; color: #666;">Preview will appear here...</div>';
    }
}

function getFormData() {
    return {
        // Personal Info
        fullName: getValue('fullName') || 'John Doe',
        email: getValue('email') || 'john.doe@example.com',
        phone: getValue('phone') || '+1 (555) 123-4567',
        website: getValue('website') || '',
        linkedin: getValue('linkedin') || '',
        location: getValue('location') || 'New York, NY',
        jobTitle: getValue('jobTitle') || 'Professional',
        
        // Professional Summary
        summary: getValue('summary') || 'Experienced professional with a passion for excellence and innovation. Dedicated to delivering high-quality results and contributing to team success.',
        
        // Dynamic lists
        experience: experienceList.length > 0 ? experienceList : [{
            title: 'Software Developer',
            company: 'Tech Company Inc.',
            startDate: 'Jan 2020',
            endDate: 'Present',
            description: 'Developed and maintained web applications using modern technologies. Collaborated with cross-functional teams to deliver high-quality software solutions.'
        }],
        
        education: educationList.length > 0 ? educationList : [{
            degree: 'Bachelor of Computer Science',
            institution: 'University of Technology',
            graduationDate: '2019',
            gpa: '3.8'
        }],
        
        projects: projectsList.length > 0 ? projectsList : [],
        skills: skillsList.length > 0 ? skillsList : ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
        softSkills: softSkillsList.length > 0 ? softSkillsList : ['Leadership', 'Communication', 'Problem Solving'],
        interests: interestsList.length > 0 ? interestsList : ['Technology', 'Reading', 'Travel']
    };
}

function getValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : '';
}

function generateResumeHTML(data) {
    const theme = themes[currentTheme] || themes.blue;
    
    // Adjust colors based on intensity
    const adjustedTheme = {
        primary: adjustColorIntensity(theme.primary, colorIntensity),
        secondary: adjustColorIntensity(theme.secondary, colorIntensity),
        light: theme.light
    };
    
    // Set CSS variables for theme
    const themeStyles = `
        <style>
            :root {
                --primary-color: ${adjustedTheme.primary};
                --secondary-color: ${adjustedTheme.secondary};
                --light-color: ${adjustedTheme.light};
            }
        </style>
    `;

    let resumeHTML = '';

    try {
        switch (currentTemplate) {
            case 'modern':
                resumeHTML = generateModernTemplate(data);
                break;
            case 'executive':
                resumeHTML = generateExecutiveTemplate(data);
                break;
            case 'minimal':
                resumeHTML = generateMinimalTemplate(data);
                break;
            case 'creative':
                resumeHTML = generateCreativeTemplate(data);
                break;
            case 'professional':
                resumeHTML = generateProfessionalTemplate(data);
                break;
            case 'elegant':
                resumeHTML = generateElegantTemplate(data);
                break;
            case 'tech':
                resumeHTML = generateTechTemplate(data);
                break;
            case 'classic':
                resumeHTML = generateClassicTemplate(data);
                break;
            default:
                resumeHTML = generateModernTemplate(data);
        }
    } catch (error) {
        console.error('Error generating template:', error);
        resumeHTML = generateModernTemplate(data);
    }

    return themeStyles + resumeHTML;
}

function generateModernTemplate(data) {
    const theme = themes[currentTheme] || themes.blue;
    const adjustedTheme = {
        primary: adjustColorIntensity(theme.primary, colorIntensity),
        secondary: adjustColorIntensity(theme.secondary, colorIntensity),
        light: theme.light
    };
    
    return `
        <div class="resume-container template-modern">
            <div class="resume-sidebar" style="background: ${adjustedTheme.primary} !important; color: white !important; -webkit-print-color-adjust: exact !important;">
                ${profileImageSrc ? `<div style="text-align: center; margin-bottom: 1.5rem;"><img src="${profileImageSrc}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid rgba(255,255,255,0.3);"></div>` : ''}
                
                <div class="resume-section">
                    <h3 class="sidebar-section-title"><i class="fas fa-envelope"></i> Contact</h3>
                    <div class="sidebar-contact-item"><i class="fas fa-envelope"></i> ${data.email}</div>
                    <div class="sidebar-contact-item"><i class="fas fa-phone"></i> ${data.phone}</div>
                    ${data.website ? `<div class="sidebar-contact-item"><i class="fas fa-globe"></i> ${data.website}</div>` : ''}
                    ${data.linkedin ? `<div class="sidebar-contact-item"><i class="fab fa-linkedin"></i> ${data.linkedin}</div>` : ''}
                    <div class="sidebar-contact-item"><i class="fas fa-map-marker-alt"></i> ${data.location}</div>
                </div>

                <div class="resume-section">
                    <h3 class="sidebar-section-title"><i class="fas fa-cogs"></i> Skills</h3>
                    ${(data.skills || []).map(skill => `<div class="sidebar-skill-item">${skill}</div>`).join('')}
                </div>

                <div class="resume-section">
                    <h3 class="sidebar-section-title"><i class="fas fa-heart"></i> Soft Skills</h3>
                    ${(data.softSkills || []).map(skill => `<div class="sidebar-skill-item">${skill}</div>`).join('')}
                </div>

                <div class="resume-section">
                    <h3 class="sidebar-section-title"><i class="fas fa-star"></i> Interests</h3>
                    ${(data.interests || []).map(interest => `<div class="sidebar-skill-item">${interest}</div>`).join('')}
                </div>
            </div>

            <div class="resume-main">
                <div class="resume-section">
                    <h1 class="resume-name">${data.fullName}</h1>
                    <p class="resume-title">${data.jobTitle}</p>
                </div>

                <div class="resume-section">
                    <h2 class="resume-section-title" style="color: ${adjustedTheme.primary}; border-color: ${adjustedTheme.primary};"><i class="fas fa-user"></i> Professional Summary</h2>
                    <p class="resume-item-description">${data.summary}</p>
                </div>

                <div class="resume-section">
                    <h2 class="resume-section-title" style="color: ${adjustedTheme.primary}; border-color: ${adjustedTheme.primary};"><i class="fas fa-briefcase"></i> Work Experience</h2>
                    ${data.experience.map(exp => `
                        <div class="resume-item">
                            <div class="resume-item-header">
                                <div>
                                    <h3 class="resume-item-title">${exp.title}</h3>
                                    <p class="resume-item-subtitle">${exp.company}</p>
                                </div>
                                <div class="resume-item-date">
                                    <i class="fas fa-calendar"></i> ${exp.startDate} - ${exp.endDate}
                                </div>
                            </div>
                            <p class="resume-item-description">${exp.description}</p>
                        </div>
                    `).join('')}
                </div>

                <div class="resume-section">
                    <h2 class="resume-section-title" style="color: ${adjustedTheme.primary}; border-color: ${adjustedTheme.primary};"><i class="fas fa-graduation-cap"></i> Education</h2>
                    ${data.education.map(edu => `
                        <div class="resume-item">
                            <div class="resume-item-header">
                                <div>
                                    <h3 class="resume-item-title">${edu.degree}</h3>
                                    <p class="resume-item-subtitle">${edu.institution}</p>
                                </div>
                                <div class="resume-item-date">
                                    <i class="fas fa-calendar"></i> ${edu.graduationDate}
                                </div>
                            </div>
                            ${edu.gpa ? `<p class="resume-item-description">GPA: ${edu.gpa}</p>` : ''}
                        </div>
                    `).join('')}
                </div>

                ${data.projects && data.projects.length > 0 ? `
                <div class="resume-section">
                    <h2 class="resume-section-title" style="color: ${adjustedTheme.primary}; border-color: ${adjustedTheme.primary};"><i class="fas fa-code"></i> Projects</h2>
                    ${data.projects.map(project => `
                        <div class="resume-item">
                            <div class="resume-item-header">
                                <div>
                                    <h3 class="resume-item-title">${project.name}</h3>
                                </div>
                            </div>
                            <p class="resume-item-description">${project.description}</p>
                            ${project.github || project.demo ? `
                            <div class="project-links">
                                ${project.github ? `<a href="${project.github}" class="project-link"><i class="fab fa-github"></i> GitHub</a>` : ''}
                                ${project.demo ? `<a href="${project.demo}" class="project-link"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                            </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
                ` : ''}
            </div>
        </div>
    `;
}

function generateExecutiveTemplate(data) {
    const theme = themes[currentTheme] || themes.blue;
    const adjustedTheme = {
        primary: adjustColorIntensity(theme.primary, colorIntensity),
        secondary: adjustColorIntensity(theme.secondary, colorIntensity),
        light: theme.light
    };
    
    return `
        <div class="resume-container template-executive">
            <div class="resume-header" style="background: ${adjustedTheme.primary} !important; color: white !important; padding: 2rem; text-align: center; -webkit-print-color-adjust: exact !important;">
                ${profileImageSrc ? `<img src="${profileImageSrc}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-bottom: 1rem; border: 3px solid rgba(255,255,255,0.3);">` : ''}
                <h1 style="margin: 0; font-size: 2.5rem;">${data.fullName}</h1>
                <p style="margin: 0.5rem 0 0 0; font-size: 1.2rem; opacity: 0.9;">${data.jobTitle}</p>
                <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
                    <span><i class="fas fa-envelope"></i> ${data.email}</span>
                    <span><i class="fas fa-phone"></i> ${data.phone}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${data.location}</span>
                </div>
            </div>
            
            <div style="padding: 2rem;">
                <div class="resume-section">
                    <h2 style="color: ${adjustedTheme.primary}; border-bottom: 2px solid ${adjustedTheme.primary}; padding-bottom: 0.5rem;">Professional Summary</h2>
                    <p>${data.summary}</p>
                </div>
                
                <div class="resume-section">
                    <h2 style="color: ${adjustedTheme.primary}; border-bottom: 2px solid ${adjustedTheme.primary}; padding-bottom: 0.5rem;">Work Experience</h2>
                    ${data.experience.map(exp => `
                        <div style="margin-bottom: 1.5rem;">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                                <div>
                                    <h3 style="margin: 0; color: ${adjustedTheme.primary};">${exp.title}</h3>
                                    <p style="margin: 0; font-weight: 600;">${exp.company}</p>
                                </div>
                                <span style="color: #666; font-size: 0.9rem;">${exp.startDate} - ${exp.endDate}</span>
                            </div>
                            <p style="margin: 0;">${exp.description}</p>
                        </div>
                    `).join('')}
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <div>
                        <h2 style="color: ${adjustedTheme.primary}; border-bottom: 2px solid ${adjustedTheme.primary}; padding-bottom: 0.5rem;">Education</h2>
                        ${data.education.map(edu => `
                            <div style="margin-bottom: 1rem;">
                                <h3 style="margin: 0; color: ${adjustedTheme.primary};">${edu.degree}</h3>
                                <p style="margin: 0; font-weight: 600;">${edu.institution}</p>
                                <span style="color: #666; font-size: 0.9rem;">${edu.graduationDate}</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div>
                        <h2 style="color: ${adjustedTheme.primary}; border-bottom: 2px solid ${adjustedTheme.primary}; padding-bottom: 0.5rem;">Skills</h2>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            ${data.skills.map(skill => `<span style="background: ${adjustedTheme.light}; color: ${adjustedTheme.primary}; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.9rem;">${skill}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateMinimalTemplate(data) {
    const theme = themes[currentTheme] || themes.blue;
    const adjustedTheme = {
        primary: adjustColorIntensity(theme.primary, colorIntensity),
        secondary: adjustColorIntensity(theme.secondary, colorIntensity),
        light: theme.light
    };
    
    return `
        <div class="resume-container template-minimal" style="max-width: 800px; margin: 0 auto; padding: 2rem; font-family: 'Arial', sans-serif; line-height: 1.6;">
            <div style="text-align: center; margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 2rem;">
                ${profileImageSrc ? `<img src="${profileImageSrc}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 1rem;">` : ''}
                <h1 style="margin: 0; font-size: 2.5rem; color: #333;">${data.fullName}</h1>
                <div style="margin-top: 1rem; color: #666;">
                    ${data.email} • ${data.phone} • ${data.location}
                </div>
            </div>
            
            <div class="resume-section" style="margin-bottom: 2rem;">
                <h2 style="color: ${adjustedTheme.primary}; font-size: 1.3rem; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 1px;">Summary</h2>
                <p style="color: #555;">${data.summary}</p>
            </div>
            
            <div class="resume-section" style="margin-bottom: 2rem;">
                <h2 style="color: ${adjustedTheme.primary}; font-size: 1.3rem; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 1px;">Experience</h2>
                ${data.experience.map(exp => `
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <h3 style="margin: 0; color: #333;">${exp.title} - ${exp.company}</h3>
                            <span style="color: #666; font-size: 0.9rem;">${exp.startDate} - ${exp.endDate}</span>
                        </div>
                        <p style="margin: 0; color: #555;">${exp.description}</p>
                    </div>
                `).join('')}
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div>
                    <h2 style="color: ${adjustedTheme.primary}; font-size: 1.3rem; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 1px;">Education</h2>
                    ${data.education.map(edu => `
                        <div style="margin-bottom: 1rem;">
                            <h3 style="margin: 0; color: #333;">${edu.degree}</h3>
                            <p style="margin: 0; color: #666;">${edu.institution} • ${edu.graduationDate}</p>
                        </div>
                    `).join('')}
                </div>
                
                <div>
                    <h2 style="color: ${adjustedTheme.primary}; font-size: 1.3rem; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 1px;">Skills</h2>
                    <div style="color: #555;">
                        ${data.skills.join(' • ')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateCreativeTemplate(data) {
    return `
        <div class="resume-container template-creative" style="position: relative; background: white;">
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 150px; background: linear-gradient(45deg, ${themes[currentTheme].primary} 0%, ${themes[currentTheme].secondary} 100%);"></div>
            
            <div style="position: relative; z-index: 1; padding: 2rem;">
                <div style="text-align: center; margin-bottom: 2rem; color: white;">
                    ${profileImageSrc ? `<img src="${profileImageSrc}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 4px solid white; margin-bottom: 1rem;">` : ''}
                    <h1 style="margin: 0; font-size: 3rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">${data.fullName}</h1>
                    <p style="margin: 0.5rem 0; font-size: 1.3rem; opacity: 0.9;">${data.jobTitle}</p>
                </div>
                
                <div style="background: white; border-radius: 15px; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin-top: 1rem;">
                    <div class="resume-section" style="margin-bottom: 2rem;">
                        <h2 style="color: ${themes[currentTheme].primary}; font-size: 1.5rem; margin-bottom: 1rem; position: relative;">
                            <span style="background: ${themes[currentTheme].light}; padding: 0.5rem 1rem; border-radius: 25px;">About Me</span>
                        </h2>
                        <p style="color: #555; font-size: 1.1rem;">${data.summary}</p>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 3rem;">
                        <div>
                            <h2 style="color: ${themes[currentTheme].primary}; font-size: 1.5rem; margin-bottom: 1rem;">
                                <span style="background: ${themes[currentTheme].light}; padding: 0.5rem 1rem; border-radius: 25px;">Experience</span>
                            </h2>
                            ${data.experience.map(exp => `
                                <div style="margin-bottom: 2rem; padding: 1.5rem; background: ${themes[currentTheme].light}; border-radius: 10px; border-left: 4px solid ${themes[currentTheme].primary};">
                                    <h3 style="margin: 0; color: ${themes[currentTheme].primary}; font-size: 1.3rem;">${exp.title}</h3>
                                    <p style="margin: 0.5rem 0; font-weight: 600; color: #333;">${exp.company}</p>
                                    <span style="color: #666; font-size: 0.9rem;">${exp.startDate} - ${exp.endDate}</span>
                                    <p style="margin-top: 1rem; color: #555;">${exp.description}</p>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div>
                            <div style="margin-bottom: 2rem;">
                                <h2 style="color: ${themes[currentTheme].primary}; font-size: 1.3rem; margin-bottom: 1rem;">Contact</h2>
                                <div style="color: #555;">
                                    <p><i class="fas fa-envelope" style="color: ${themes[currentTheme].primary};"></i> ${data.email}</p>
                                    <p><i class="fas fa-phone" style="color: ${themes[currentTheme].primary};"></i> ${data.phone}</p>
                                    <p><i class="fas fa-map-marker-alt" style="color: ${themes[currentTheme].primary};"></i> ${data.location}</p>
                                </div>
                            </div>
                            
                            <div style="margin-bottom: 2rem;">
                                <h2 style="color: ${themes[currentTheme].primary}; font-size: 1.3rem; margin-bottom: 1rem;">Skills</h2>
                                <div>
                                    ${data.skills.map(skill => `<span style="display: inline-block; background: ${themes[currentTheme].primary}; color: white; padding: 0.4rem 0.8rem; border-radius: 20px; font-size: 0.8rem; margin: 0.2rem; font-weight: 600;">${skill}</span>`).join('')}
                                </div>
                            </div>
                            
                            <div>
                                <h2 style="color: ${themes[currentTheme].primary}; font-size: 1.3rem; margin-bottom: 1rem;">Education</h2>
                                ${data.education.map(edu => `
                                    <div style="margin-bottom: 1rem; padding: 1rem; background: ${themes[currentTheme].light}; border-radius: 8px;">
                                        <h3 style="margin: 0; color: ${themes[currentTheme].primary}; font-size: 1rem;">${edu.degree}</h3>
                                        <p style="margin: 0; color: #666; font-size: 0.9rem;">${edu.institution}</p>
                                        <span style="color: #888; font-size: 0.8rem;">${edu.graduationDate}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateProfessionalTemplate(data) {
    return `
        <div class="resume-container template-professional" style="max-width: 800px; margin: 0 auto; background: white; font-family: 'Times New Roman', serif;">
            <div style="border-top: 4px solid ${themes[currentTheme].primary}; padding: 2rem;">
                <div style="text-align: center; margin-bottom: 2rem;">
                    ${profileImageSrc ? `<img src="${profileImageSrc}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 1rem;">` : ''}
                    <h1 style="margin: 0; font-size: 2.5rem; color: #333; font-weight: normal;">${data.fullName}</h1>
                    <div style="margin-top: 1rem; color: #666; font-size: 1.1rem;">
                        ${data.email} | ${data.phone} | ${data.location}
                    </div>
                </div>
                
                <div class="resume-section" style="margin-bottom: 2rem;">
                    <h2 style="color: ${themes[currentTheme].primary}; font-size: 1.4rem; margin-bottom: 1rem; text-align: center; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid ${themes[currentTheme].primary}; padding-bottom: 0.5rem;">Professional Summary</h2>
                    <p style="text-align: justify; color: #444; font-size: 1.1rem; line-height: 1.8;">${data.summary}</p>
                </div>
                
                <div class="resume-section" style="margin-bottom: 2rem;">
                    <h2 style="color: ${themes[currentTheme].primary}; font-size: 1.4rem; margin-bottom: 1rem; text-align: center; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid ${themes[currentTheme].primary}; padding-bottom: 0.5rem;">Professional Experience</h2>
                    ${data.experience.map(exp => `
                        <div style="margin-bottom: 2rem;">
                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
                                <h3 style="margin: 0; color: #333; font-size: 1.2rem;">${exp.title}</h3>
                                <span style="color: #666; font-style: italic;">${exp.startDate} - ${exp.endDate}</span>
                            </div>
                            <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: ${themes[currentTheme].primary};">${exp.company}</p>
                            <p style="margin: 0; color: #555; text-align: justify; line-height: 1.6;">${exp.description}</p>
                        </div>
                    `).join('')}
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <div>
                        <h2 style="color: ${themes[currentTheme].primary}; font-size: 1.4rem; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid ${themes[currentTheme].primary}; padding-bottom: 0.5rem;">Education</h2>
                        ${data.education.map(edu => `
                            <div style="margin-bottom: 1.5rem;">
                                <h3 style="margin: 0; color: #333; font-size: 1.1rem;">${edu.degree}</h3>
                                <p style="margin: 0; color: ${themes[currentTheme].primary}; font-weight: 600;">${edu.institution}</p>
                                <span style="color: #666; font-style: italic;">${edu.graduationDate}</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div>
                        <h2 style="color: ${themes[currentTheme].primary}; font-size: 1.4rem; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid ${themes[currentTheme].primary}; padding-bottom: 0.5rem;">Core Competencies</h2>
                        <div style="color: #555; line-height: 2;">
                            ${data.skills.map(skill => `• ${skill}`).join('<br>')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateElegantTemplate(data) {
    return `
        <div class="resume-container template-elegant" style="max-width: 800px; margin: 0 auto; background: white; border: 3px solid #d4af37; position: relative;">
            <div style="position: absolute; top: 15px; left: 15px; right: 15px; bottom: 15px; border: 1px solid #d4af37;"></div>
            
            <div style="position: relative; z-index: 1; padding: 3rem;">
                <div style="text-align: center; margin-bottom: 2rem; border-bottom: 2px solid #d4af37; padding-bottom: 2rem;">
                    ${profileImageSrc ? `<img src="${profileImageSrc}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 3px solid #d4af37; margin-bottom: 1rem;">` : ''}
                    <h1 style="margin: 0; font-size: 2.8rem; color: #333; font-family: 'Georgia', serif; font-weight: normal;">${data.fullName}</h1>
                    <div style="margin-top: 1rem; color: #666; font-size: 1.1rem; font-style: italic;">
                        ${data.email} • ${data.phone} • ${data.location}
                    </div>
                </div>
                
                <div class="resume-section" style="margin-bottom: 2rem;">
                    <h2 style="color: ${themes[currentTheme].primary}; font-size: 1.5rem; margin-bottom: 1rem; text-align: center; font-family: 'Georgia', serif; position: relative;">
                        <span style="background: white; padding: 0 1rem; position: relative; z-index: 1;">Professional Profile</span>
                        <div style="position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: #d4af37; z-index: 0;"></div>
                    </h2>
                    <p style="text-align: center; color: #555; font-size: 1.1rem; line-height: 1.8; font-style: italic;">${data.summary}</p>
                </div>
                
                <div class="resume-section" style="margin-bottom: 2rem;">
                    <h2 style="color: ${themes[currentTheme].primary}; font-size: 1.5rem; margin-bottom: 1rem; text-align: center; font-family: 'Georgia', serif; position: relative;">
                        <span style="background: white; padding: 0 1rem; position: relative; z-index: 1;">Professional Experience</span>
                        <div style="position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: #d4af37; z-index: 0;"></div>
                    </h2>
                    ${data.experience.map(exp => `
                        <div style="margin-bottom: 2rem; padding: 1.5rem; border: 1px solid #e0e0e0; border-radius: 8px; background: #fafafa;">
                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
                                <h3 style="margin: 0; color: ${themes[currentTheme].primary}; font-size: 1.3rem; font-family: 'Georgia', serif;">${exp.title}</h3>
                                <span style="color: #d4af37; font-weight: 600; font-size: 0.9rem;">${exp.startDate} - ${exp.endDate}</span>
                            </div>
                            <p style="margin: 0 0 1rem 0; font-weight: 600; color: #666; font-size: 1.1rem;">${exp.company}</p>
                            <p style="margin: 0; color: #555; text-align: justify; line-height: 1.7;">${exp.description}</p>
                        </div>
                    `).join('')}
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;">
                    <div>
                        <h2 style="color: ${themes[currentTheme].primary}; font-size: 1.3rem; margin-bottom: 1rem; font-family: 'Georgia', serif; text-align: center; position: relative;">
                            <span style="background: white; padding: 0 1rem;">Education</span>
                            <div style="position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: #d4af37; z-index: 0;"></div>
                        </h2>
                        ${data.education.map(edu => `
                            <div style="margin-bottom: 1.5rem; text-align: center;">
                                <h3 style="margin: 0; color: ${themes[currentTheme].primary}; font-size: 1.1rem; font-family: 'Georgia', serif;">${edu.degree}</h3>
                                <p style="margin: 0.5rem 0; color: #666; font-weight: 600;">${edu.institution}</p>
                                <span style="color: #d4af37; font-style: italic;">${edu.graduationDate}</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div>
                        <h2 style="color: ${themes[currentTheme].primary}; font-size: 1.3rem; margin-bottom: 1rem; font-family: 'Georgia', serif; text-align: center; position: relative;">
                            <span style="background: white; padding: 0 1rem;">Expertise</span>
                            <div style="position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: #d4af37; z-index: 0;"></div>
                        </h2>
                        <div style="text-align: center;">
                            ${data.skills.map(skill => `<span style="display: inline-block; background: linear-gradient(135deg, ${themes[currentTheme].primary}, #d4af37); color: white; padding: 0.4rem 1rem; border-radius: 25px; font-size: 0.9rem; margin: 0.3rem; font-weight: 500; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">${skill}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateTechTemplate(data) {
    const theme = themes[currentTheme] || themes.blue;
    const adjustedTheme = {
        primary: adjustColorIntensity(theme.primary, colorIntensity),
        secondary: adjustColorIntensity(theme.secondary, colorIntensity),
        light: theme.light
    };
    
    return `
        <div class="resume-container template-tech" style="background: #1a1a1a; color: white; font-family: 'Courier New', monospace;">
            <div style="background: linear-gradient(90deg, ${adjustedTheme.primary} 0%, ${adjustedTheme.secondary} 100%); padding: 2rem; text-align: center;">
                ${profileImageSrc ? `<img src="${profileImageSrc}" style="width: 100px; height: 100px; border-radius: 8px; object-fit: cover; margin-bottom: 1rem; border: 2px solid #00ff00;">` : ''}
                <h1 style="margin: 0; font-size: 2.5rem; color: #00ff00; text-shadow: 0 0 10px #00ff00;">${data.fullName}</h1>
                <p style="margin: 0.5rem 0; font-size: 1.2rem; color: #00d4ff;">${data.jobTitle}</p>
                <div style="margin-top: 1rem; font-family: 'Arial', sans-serif;">
                    <span style="margin-right: 2rem;"><i class="fas fa-envelope" style="color: #00ff00;"></i> ${data.email}</span>
                    <span style="margin-right: 2rem;"><i class="fas fa-phone" style="color: #00ff00;"></i> ${data.phone}</span>
                    <span><i class="fas fa-map-marker-alt" style="color: #00ff00;"></i> ${data.location}</span>
                </div>
            </div>
            
            <div style="padding: 2rem; background: #2a2a2a;">
                <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 2rem;">
                    <div>
                        <div style="margin-bottom: 2rem;">
                            <h2 style="color: #00ff00; font-size: 1.2rem; margin-bottom: 1rem; border-bottom: 1px solid #00ff00; padding-bottom: 0.5rem;">SKILLS</h2>
                            ${data.skills.map(skill => `<div style="margin-bottom: 0.5rem; color: #00d4ff;">▶ ${skill}</div>`).join('')}
                        </div>
                        
                        <div style="margin-bottom: 2rem;">
                            <h2 style="color: #00ff00; font-size: 1.2rem; margin-bottom: 1rem; border-bottom: 1px solid #00ff00; padding-bottom: 0.5rem;">CONTACT</h2>
                            ${data.website ? `<div style="margin-bottom: 0.5rem; color: #00d4ff;">🌐 ${data.website}</div>` : ''}
                            ${data.linkedin ? `<div style="margin-bottom: 0.5rem; color: #00d4ff;">💼 ${data.linkedin}</div>` : ''}
                        </div>
                        
                        <div>
                            <h2 style="color: #00ff00; font-size: 1.2rem; margin-bottom: 1rem; border-bottom: 1px solid #00ff00; padding-bottom: 0.5rem;">INTERESTS</h2>
                            ${data.interests.map(interest => `<div style="margin-bottom: 0.5rem; color: #00d4ff;">• ${interest}</div>`).join('')}
                        </div>
                    </div>
                    
                    <div>
                        <div style="margin-bottom: 2rem;">
                            <h2 style="color: #00ff00; font-size: 1.2rem; margin-bottom: 1rem; border-bottom: 1px solid #00ff00; padding-bottom: 0.5rem;">SUMMARY</h2>
                            <p style="color: #ccc; line-height: 1.6;">${data.summary}</p>
                        </div>
                        
                        <div style="margin-bottom: 2rem;">
                            <h2 style="color: #00ff00; font-size: 1.2rem; margin-bottom: 1rem; border-bottom: 1px solid #00ff00; padding-bottom: 0.5rem;">EXPERIENCE</h2>
                            ${data.experience.map(exp => `
                                <div style="margin-bottom: 1.5rem; padding: 1rem; background: #333; border-left: 3px solid #00d4ff;">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                        <h3 style="margin: 0; color: #00d4ff;">${exp.title}</h3>
                                        <span style="color: #00ff00; font-size: 0.9rem;">${exp.startDate} - ${exp.endDate}</span>
                                    </div>
                                    <p style="margin: 0 0 0.5rem 0; color: #fff; font-weight: 600;">${exp.company}</p>
                                    <p style="margin: 0; color: #ccc; font-size: 0.9rem;">${exp.description}</p>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div>
                            <h2 style="color: #00ff00; font-size: 1.2rem; margin-bottom: 1rem; border-bottom: 1px solid #00ff00; padding-bottom: 0.5rem;">EDUCATION</h2>
                            ${data.education.map(edu => `
                                <div style="margin-bottom: 1rem; padding: 1rem; background: #333;">
                                    <h3 style="margin: 0; color: #00d4ff;">${edu.degree}</h3>
                                    <p style="margin: 0; color: #fff;">${edu.institution}</p>
                                    <span style="color: #00ff00; font-size: 0.9rem;">${edu.graduationDate}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateClassicTemplate(data) {
    const theme = themes[currentTheme] || themes.blue;
    const adjustedTheme = {
        primary: adjustColorIntensity(theme.primary, colorIntensity),
        secondary: adjustColorIntensity(theme.secondary, colorIntensity),
        light: theme.light
    };
    
    return `
        <div class="resume-container template-classic" style="max-width: 800px; margin: 0 auto; background: white; font-family: 'Times New Roman', serif; color: #000; border: 1px solid #000;">
            <div style="text-align: center; padding: 2rem; border-bottom: 2px solid #000;">
                ${profileImageSrc ? `<img src="${profileImageSrc}" style="width: 120px; height: 120px; border-radius: 0; object-fit: cover; margin-bottom: 1rem; border: 2px solid #000;">` : ''}
                <h1 style="margin: 0; font-size: 2.8rem; color: #000; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">${data.fullName}</h1>
                <p style="margin: 0.5rem 0; font-size: 1.3rem; color: #000; font-style: italic;">${data.jobTitle}</p>
                <div style="margin-top: 1rem; font-size: 1rem;">
                    ${data.email} | ${data.phone} | ${data.location}
                </div>
            </div>
            
            <div style="padding: 2rem;">
                <div style="margin-bottom: 2rem;">
                    <h2 style="color: #000; font-size: 1.4rem; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #000; padding-bottom: 0.5rem;">PROFESSIONAL SUMMARY</h2>
                    <p style="text-align: justify; color: #000; font-size: 1rem; line-height: 1.8;">${data.summary}</p>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h2 style="color: #000; font-size: 1.4rem; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #000; padding-bottom: 0.5rem;">WORK EXPERIENCE</h2>
                    ${data.experience.map(exp => `
                        <div style="margin-bottom: 2rem;">
                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
                                <h3 style="margin: 0; color: #000; font-size: 1.2rem; font-weight: bold;">${exp.title}</h3>
                                <span style="color: #000; font-style: italic; font-size: 0.9rem;">${exp.startDate} - ${exp.endDate}</span>
                            </div>
                            <p style="margin: 0 0 0.5rem 0; font-weight: bold; color: #000; font-size: 1rem;">${exp.company}</p>
                            <p style="margin: 0; color: #000; text-align: justify; line-height: 1.6;">${exp.description}</p>
                        </div>
                    `).join('')}
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <div>
                        <h2 style="color: #000; font-size: 1.4rem; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #000; padding-bottom: 0.5rem;">EDUCATION</h2>
                        ${data.education.map(edu => `
                            <div style="margin-bottom: 1.5rem;">
                                <h3 style="margin: 0; color: #000; font-size: 1.1rem; font-weight: bold;">${edu.degree}</h3>
                                <p style="margin: 0; color: #000; font-weight: 600;">${edu.institution}</p>
                                <span style="color: #000; font-style: italic;">${edu.graduationDate}</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div>
                        <h2 style="color: #000; font-size: 1.4rem; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #000; padding-bottom: 0.5rem;">SKILLS</h2>
                        <div style="color: #000; line-height: 2;">
                            ${data.skills.map(skill => `• ${skill}`).join('<br>')}
                        </div>
                        
                        <h3 style="color: #000; font-size: 1.2rem; margin: 1.5rem 0 1rem 0; text-transform: uppercase;">INTERESTS</h3>
                        <div style="color: #000; line-height: 1.8;">
                            ${data.interests.join(', ')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Add Experience Function
function addExperience() {
    const id = Date.now();
    const experience = {
        id: id,
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
    };
    
    experienceList.push(experience);
    renderExperienceList();
    updatePreview();
}

// Add Education Function
function addEducation() {
    const id = Date.now();
    const education = {
        id: id,
        degree: '',
        institution: '',
        graduationDate: '',
        gpa: ''
    };
    
    educationList.push(education);
    renderEducationList();
    updatePreview();
}

// Add Project Function
function addProject() {
    const id = Date.now();
    const project = {
        id: id,
        name: '',
        description: '',
        github: '',
        demo: ''
    };
    
    projectsList.push(project);
    renderProjectsList();
    updatePreview();
}

// Add Skill Function
function addSkill() {
    const skillInput = document.getElementById('skillInput');
    const skill = skillInput.value.trim();
    
    if (skill && !skillsList.includes(skill)) {
        skillsList.push(skill);
        skillInput.value = '';
        renderSkillsTags();
        updatePreview();
    }
}

// Add Soft Skill Function
function addSoftSkill() {
    const softSkillInput = document.getElementById('softSkillInput');
    if (!softSkillInput) return;
    
    const skill = softSkillInput.value.trim();
    
    if (skill && !softSkillsList.includes(skill)) {
        softSkillsList.push(skill);
        softSkillInput.value = '';
        renderSoftSkillsTags();
        updatePreview();
    }
}

// Add Interest Function
function addInterest() {
    const interestInput = document.getElementById('interestInput');
    if (!interestInput) return;
    
    const interest = interestInput.value.trim();
    
    if (interest && !interestsList.includes(interest)) {
        interestsList.push(interest);
        interestInput.value = '';
        renderInterestsTags();
        updatePreview();
    }
}

// Render Functions
function renderExperienceList() {
    const container = document.getElementById('experienceList');
    const empty = document.getElementById('experienceEmpty');
    
    if (experienceList.length === 0) {
        container.innerHTML = '';
        empty.style.display = 'block';
        return;
    }
    
    empty.style.display = 'none';
    container.innerHTML = experienceList.map(exp => `
        <div class="list-item">
            <button class="remove-btn" onclick="removeExperience(${exp.id})">
                <i class="fas fa-times"></i>
            </button>
            
            <div class="form-grid">
                <div class="form-group">
                    <label>Job Title</label>
                    <input type="text" value="${exp.title}" onchange="updateExperience(${exp.id}, 'title', this.value)">
                </div>
                
                <div class="form-group">
                    <label>Company</label>
                    <input type="text" value="${exp.company}" onchange="updateExperience(${exp.id}, 'company', this.value)">
                </div>
                
                <div class="form-group">
                    <label>Start Date</label>
                    <input type="text" value="${exp.startDate}" placeholder="Jan 2020" onchange="updateExperience(${exp.id}, 'startDate', this.value)">
                </div>
                
                <div class="form-group">
                    <label>End Date</label>
                    <input type="text" value="${exp.endDate}" placeholder="Present" onchange="updateExperience(${exp.id}, 'endDate', this.value)" ${exp.current ? 'disabled' : ''}>
                </div>
            </div>
            
            <div class="form-group">
                <label>Job Description</label>
                <textarea rows="3" onchange="updateExperience(${exp.id}, 'description', this.value)">${exp.description}</textarea>
            </div>
        </div>
    `).join('');
}

function renderEducationList() {
    const container = document.getElementById('educationList');
    const empty = document.getElementById('educationEmpty');
    
    if (educationList.length === 0) {
        container.innerHTML = '';
        empty.style.display = 'block';
        return;
    }
    
    empty.style.display = 'none';
    container.innerHTML = educationList.map(edu => `
        <div class="list-item">
            <button class="remove-btn" onclick="removeEducation(${edu.id})">
                <i class="fas fa-times"></i>
            </button>
            
            <div class="form-grid">
                <div class="form-group">
                    <label>Degree</label>
                    <input type="text" value="${edu.degree}" onchange="updateEducation(${edu.id}, 'degree', this.value)">
                </div>
                
                <div class="form-group">
                    <label>Institution</label>
                    <input type="text" value="${edu.institution}" onchange="updateEducation(${edu.id}, 'institution', this.value)">
                </div>
                
                <div class="form-group">
                    <label>Graduation Date</label>
                    <input type="text" value="${edu.graduationDate}" placeholder="2020" onchange="updateEducation(${edu.id}, 'graduationDate', this.value)">
                </div>
                
                <div class="form-group">
                    <label>GPA (Optional)</label>
                    <input type="text" value="${edu.gpa}" placeholder="3.8" onchange="updateEducation(${edu.id}, 'gpa', this.value)">
                </div>
            </div>
        </div>
    `).join('');
}

function renderProjectsList() {
    const container = document.getElementById('projectsList');
    
    container.innerHTML = projectsList.map(project => `
        <div class="list-item">
            <button class="remove-btn" onclick="removeProject(${project.id})">
                <i class="fas fa-times"></i>
            </button>
            
            <div class="form-grid">
                <div class="form-group">
                    <label>Project Name</label>
                    <input type="text" value="${project.name}" onchange="updateProject(${project.id}, 'name', this.value)">
                </div>
                
                <div class="form-group">
                    <label>GitHub URL</label>
                    <input type="url" value="${project.github}" onchange="updateProject(${project.id}, 'github', this.value)">
                </div>
                
                <div class="form-group">
                    <label>Live Demo URL</label>
                    <input type="url" value="${project.demo}" onchange="updateProject(${project.id}, 'demo', this.value)">
                </div>
            </div>
            
            <div class="form-group">
                <label>Project Description</label>
                <textarea rows="3" onchange="updateProject(${project.id}, 'description', this.value)">${project.description}</textarea>
            </div>
        </div>
    `).join('');
}

function renderSkillsTags() {
    const container = document.getElementById('skillsTags');
    if (!container) return;
    
    container.innerHTML = skillsList.map(skill => `
        <span class="tag">
            ${skill}
            <button class="remove-btn" onclick="removeSkill('${skill}')">
                <i class="fas fa-times"></i>
            </button>
        </span>
    `).join('');
}

function renderSoftSkillsTags() {
    const container = document.getElementById('softSkillsTags');
    if (!container) return;
    
    container.innerHTML = softSkillsList.map(skill => `
        <span class="tag soft-skill">
            ${skill}
            <button class="remove-btn" onclick="removeSoftSkill('${skill}')">
                <i class="fas fa-times"></i>
            </button>
        </span>
    `).join('');
}

function renderInterestsTags() {
    const container = document.getElementById('interestsTags');
    if (!container) return;
    
    container.innerHTML = interestsList.map(interest => `
        <span class="tag interest">
            ${interest}
            <button class="remove-btn" onclick="removeInterest('${interest}')">
                <i class="fas fa-times"></i>
            </button>
        </span>
    `).join('');
}

// Update Functions
function updateExperience(id, field, value) {
    const exp = experienceList.find(e => e.id === id);
    if (exp) {
        exp[field] = value;
        if (field === 'current' && value) {
            exp.endDate = 'Present';
        }
        updatePreview();
    }
}

function updateEducation(id, field, value) {
    const edu = educationList.find(e => e.id === id);
    if (edu) {
        edu[field] = value;
        updatePreview();
    }
}

function updateProject(id, field, value) {
    const project = projectsList.find(p => p.id === id);
    if (project) {
        project[field] = value;
        updatePreview();
    }
}

// Remove Functions
function removeExperience(id) {
    experienceList = experienceList.filter(e => e.id !== id);
    renderExperienceList();
    updatePreview();
}

function removeEducation(id) {
    educationList = educationList.filter(e => e.id !== id);
    renderEducationList();
    updatePreview();
}

function removeProject(id) {
    projectsList = projectsList.filter(p => p.id !== id);
    renderProjectsList();
    updatePreview();
}

function removeSkill(skill) {
    skillsList = skillsList.filter(s => s !== skill);
    renderSkillsTags();
    updatePreview();
}

function removeSoftSkill(skill) {
    softSkillsList = softSkillsList.filter(s => s !== skill);
    renderSoftSkillsTags();
    updatePreview();
}

function removeInterest(interest) {
    interestsList = interestsList.filter(i => i !== interest);
    renderInterestsTags();
    updatePreview();
}