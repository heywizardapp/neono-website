export const imageUtils = {
  // Convert image to base64 for storage
  async toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  // Validate image file
  validateImage(file: File): { valid: boolean; error?: string } {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      return { valid: false, error: 'Invalid file type. Please upload JPG, PNG, WebP, or GIF.' };
    }

    if (file.size > maxSize) {
      return { valid: false, error: 'File size exceeds 5MB limit.' };
    }

    return { valid: true };
  },

  // Generate optimized image name
  generateImageName(originalName: string): string {
    const timestamp = Date.now();
    const cleanName = originalName.toLowerCase().replace(/[^a-z0-9.]/g, '-');
    return `blog-${timestamp}-${cleanName}`;
  },

  // Store image in localStorage (for demo purposes)
  // In production, this would upload to a CDN or backend
  async storeImage(file: File): Promise<string> {
    const validation = this.validateImage(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const base64 = await this.toBase64(file);
    const imageName = this.generateImageName(file.name);
    
    // Store in localStorage
    const images = this.getAllImages();
    images[imageName] = base64;
    localStorage.setItem('neono_blog_images', JSON.stringify(images));
    
    return base64; // Return base64 URL for immediate use
  },

  // Get all stored images
  getAllImages(): Record<string, string> {
    const stored = localStorage.getItem('neono_blog_images');
    return stored ? JSON.parse(stored) : {};
  },

  // Delete an image
  deleteImage(imageName: string): void {
    const images = this.getAllImages();
    delete images[imageName];
    localStorage.setItem('neono_blog_images', JSON.stringify(images));
  }
};
