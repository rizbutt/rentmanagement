const fs = require('fs');
const path = require('path');

const directories = [
  '/src/pages/api/auth',
  '/src/pages/api',
  '/src/components',
  '/src/services',
  '/src/models',
  '/src/repositories',
  '/src/interfaces',
  '/src/dtos',
  '/src/utils',
  '/src/middleware'
];

const files = {
  '/src/pages/api/profile.ts': '',
  '/src/pages/api/property.ts': '',
  '/src/pages/api/tenant.ts': '',
  '/src/pages/api/rent.ts': '',
  '/src/pages/api/auth/login.ts': '',
  '/src/pages/api/auth/register.ts': '',
  '/src/components/ProfileForm.tsx': '',
  '/src/components/PropertyForm.tsx': '',
  '/src/components/TenantForm.tsx': '',
  '/src/components/RentForm.tsx': '',
  '/src/components/LoginForm.tsx': '',
  '/src/components/RegisterForm.tsx': '',
  '/src/services/ProfileService.ts': '',
  '/src/services/PropertyService.ts': '',
  '/src/services/TenantService.ts': '',
  '/src/services/RentService.ts': '',
  '/src/services/AuthService.ts': '',
  '/src/models/CompanyProfile.ts': '',
  '/src/models/Property.ts': '',
  '/src/models/Tenant.ts': '',
  '/src/models/Lease.ts': '',
  '/src/models/User.ts': '',
  '/src/repositories/ProfileRepository.ts': '',
  '/src/repositories/PropertyRepository.ts': '',
  '/src/repositories/TenantRepository.ts': '',
  '/src/repositories/RentRepository.ts': '',
  '/src/repositories/UserRepository.ts': '',
  '/src/interfaces/IProfileService.ts': '',
  '/src/interfaces/IPropertyService.ts': '',
  '/src/interfaces/ITenantService.ts': '',
  '/src/interfaces/IRentService.ts': '',
  '/src/interfaces/IAuthService.ts': '',
  '/src/dtos/CreateProfileDTO.ts': '',
  '/src/dtos/AddPropertyDTO.ts': '',
  '/src/dtos/CreateTenantDTO.ts': '',
  '/src/dtos/CreateRentDTO.ts': '',
  '/src/dtos/LoginDTO.ts': '',
  '/src/dtos/RegisterDTO.ts': '',
  '/src/utils/NotificationService.ts': '',
  '/src/utils/DateUtils.ts': '',
  '/src/middleware/authMiddleware.ts': ''
};

directories.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

Object.keys(files).forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, files[file]);
  }
});

console.log('Project structure created successfully.');
