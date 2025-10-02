import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { imageUtils } from '@/lib/blog/imageUtils';
import { useToast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
}

export const ImageUploader = ({ onImageUploaded }: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = imageUtils.validateImage(file);
    if (!validation.valid) {
      toast({
        variant: 'destructive',
        title: 'Invalid Image',
        description: validation.error
      });
      return;
    }

    setUploading(true);
    try {
      const imageUrl = await imageUtils.storeImage(file);
      setPreview(imageUrl);
      onImageUploaded(imageUrl);
      toast({
        title: 'Image Uploaded',
        description: 'Image has been uploaded successfully.'
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: error instanceof Error ? error.message : 'Failed to upload image'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {!preview ? (
        <Button
          type="button"
          variant="outline"
          className="w-full h-32 border-dashed"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {uploading ? 'Uploading...' : 'Click to upload image'}
            </span>
            <span className="text-xs text-muted-foreground">
              JPG, PNG, WebP or GIF (max 5MB)
            </span>
          </div>
        </Button>
      ) : (
        <div className="relative border rounded-lg overflow-hidden">
          <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ImageIcon className="h-4 w-4" />
        <span>Images are stored locally for demo purposes</span>
      </div>
    </div>
  );
};
