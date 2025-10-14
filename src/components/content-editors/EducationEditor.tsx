import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EducationContent, EducationSection, Callout, FaqItem } from '@/types/content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { educationCategories } from '@/config/education/categories';
import { Plus, Trash2, MoveUp, MoveDown, Save, Eye } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';

interface EducationEditorProps {
  initialContent?: EducationContent;
  onSave: (content: EducationContent) => void;
}

export function EducationEditor({ initialContent, onSave }: EducationEditorProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [content, setContent] = useState<EducationContent>(
    initialContent || {
      id: Date.now().toString(),
      title: '',
      excerpt: '',
      category: '',
      tags: [],
      slug: '',
      publishedAt: new Date().toISOString(),
      author: 'Admin',
      status: 'draft',
      contentType: 'education',
      categoryPath: [],
      description: '',
      estimatedReadTime: '5 min read',
      sections: [],
      faqs: [],
      relatedArticles: []
    }
  );

  const [newTag, setNewTag] = useState('');
  const [activeTab, setActiveTab] = useState('details');

  // Section Management
  const addSection = () => {
    const newSection: EducationSection = {
      id: `section-${Date.now()}`,
      title: '',
      content: '',
      callouts: []
    };
    setContent({ ...content, sections: [...content.sections, newSection] });
  };

  const updateSection = (index: number, updates: Partial<EducationSection>) => {
    const updatedSections = [...content.sections];
    updatedSections[index] = { ...updatedSections[index], ...updates };
    setContent({ ...content, sections: updatedSections });
  };

  const deleteSection = (index: number) => {
    setContent({ ...content, sections: content.sections.filter((_, i) => i !== index) });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...content.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    setContent({ ...content, sections: newSections });
  };

  // Callout Management
  const addCallout = (sectionIndex: number) => {
    const newCallout: Callout = { type: 'tip', content: '' };
    const updatedSections = [...content.sections];
    updatedSections[sectionIndex].callouts = [
      ...(updatedSections[sectionIndex].callouts || []),
      newCallout
    ];
    setContent({ ...content, sections: updatedSections });
  };

  const updateCallout = (sectionIndex: number, calloutIndex: number, updates: Partial<Callout>) => {
    const updatedSections = [...content.sections];
    updatedSections[sectionIndex].callouts![calloutIndex] = {
      ...updatedSections[sectionIndex].callouts![calloutIndex],
      ...updates
    };
    setContent({ ...content, sections: updatedSections });
  };

  const deleteCallout = (sectionIndex: number, calloutIndex: number) => {
    const updatedSections = [...content.sections];
    updatedSections[sectionIndex].callouts = updatedSections[sectionIndex].callouts?.filter(
      (_, i) => i !== calloutIndex
    );
    setContent({ ...content, sections: updatedSections });
  };

  // FAQ Management
  const addFaq = () => {
    const newFaq: FaqItem = { question: '', answer: '' };
    setContent({ ...content, faqs: [...(content.faqs || []), newFaq] });
  };

  const updateFaq = (index: number, updates: Partial<FaqItem>) => {
    const updatedFaqs = [...(content.faqs || [])];
    updatedFaqs[index] = { ...updatedFaqs[index], ...updates };
    setContent({ ...content, faqs: updatedFaqs });
  };

  const deleteFaq = (index: number) => {
    setContent({ ...content, faqs: content.faqs?.filter((_, i) => i !== index) });
  };

  // Tag Management
  const addTag = () => {
    if (newTag && !content.tags.includes(newTag)) {
      setContent({ ...content, tags: [...content.tags, newTag] });
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setContent({ ...content, tags: content.tags.filter(t => t !== tag) });
  };

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSave = () => {
    if (!content.title || !content.category || content.sections.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in title, category, and at least one section.',
        variant: 'destructive'
      });
      return;
    }

    const slug = content.slug || generateSlug(content.title);
    const savedContent = {
      ...content,
      slug,
      lastUpdated: new Date().toISOString()
    };

    onSave(savedContent);
    toast({
      title: 'Success',
      description: 'Education article saved successfully!'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Education Article Editor</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/admin/blog')}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Article
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="sections">Sections</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Article Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={content.title}
                  onChange={(e) => setContent({ ...content, title: e.target.value })}
                  placeholder="How to collect split payments"
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={content.description}
                  onChange={(e) => setContent({ ...content, description: e.target.value })}
                  placeholder="Brief overview of what this article covers..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={content.category}
                    onValueChange={(value) => setContent({ ...content, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select
                    value={content.difficulty || ''}
                    onValueChange={(value: any) => setContent({ ...content, difficulty: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="readTime">Estimated Read Time</Label>
                <Input
                  id="readTime"
                  value={content.estimatedReadTime}
                  onChange={(e) => setContent({ ...content, estimatedReadTime: e.target.value })}
                  placeholder="5 min read"
                />
              </div>

              <div>
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    placeholder="Add tag..."
                  />
                  <Button onClick={addTag} type="button">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {content.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="ml-2">×</button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sections Tab */}
        <TabsContent value="sections" className="space-y-6">
          {content.sections.map((section, sectionIndex) => (
            <Card key={section.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Section {sectionIndex + 1}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveSection(sectionIndex, 'up')}
                      disabled={sectionIndex === 0}
                    >
                      <MoveUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveSection(sectionIndex, 'down')}
                      disabled={sectionIndex === content.sections.length - 1}
                    >
                      <MoveDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteSection(sectionIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Section Title</Label>
                  <Input
                    value={section.title}
                    onChange={(e) => updateSection(sectionIndex, { title: e.target.value })}
                    placeholder="Section title..."
                  />
                </div>

                <div>
                  <Label>Content</Label>
                  <MDEditor
                    value={section.content}
                    onChange={(val) => updateSection(sectionIndex, { content: val || '' })}
                    height={300}
                  />
                </div>

                <div>
                  <Label>Screenshot URL (optional)</Label>
                  <Input
                    value={section.screenshot?.src || ''}
                    onChange={(e) =>
                      updateSection(sectionIndex, {
                        screenshot: { src: e.target.value, alt: section.title }
                      })
                    }
                    placeholder="https://..."
                  />
                </div>

                {/* Callouts */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Callouts</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addCallout(sectionIndex)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Callout
                    </Button>
                  </div>
                  {section.callouts?.map((callout, calloutIndex) => (
                    <Card key={calloutIndex} className="mb-2 p-3">
                      <div className="flex gap-2 items-start">
                        <Select
                          value={callout.type}
                          onValueChange={(value: any) =>
                            updateCallout(sectionIndex, calloutIndex, { type: value })
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tip">Tip</SelectItem>
                            <SelectItem value="warning">Warning</SelectItem>
                            <SelectItem value="note">Note</SelectItem>
                            <SelectItem value="important">Important</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          value={callout.content}
                          onChange={(e) =>
                            updateCallout(sectionIndex, calloutIndex, { content: e.target.value })
                          }
                          placeholder="Callout content..."
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteCallout(sectionIndex, calloutIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          <Button onClick={addSection} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Section
          </Button>
        </TabsContent>

        {/* FAQs Tab */}
        <TabsContent value="faqs" className="space-y-6">
          {content.faqs?.map((faq, index) => (
            <Card key={index}>
              <CardContent className="pt-6 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-3">
                    <div>
                      <Label>Question</Label>
                      <Input
                        value={faq.question}
                        onChange={(e) => updateFaq(index, { question: e.target.value })}
                        placeholder="Frequently asked question..."
                      />
                    </div>
                    <div>
                      <Label>Answer</Label>
                      <Textarea
                        value={faq.answer}
                        onChange={(e) => updateFaq(index, { answer: e.target.value })}
                        placeholder="Answer to the question..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteFaq(index)}
                    className="ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button onClick={addFaq} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add FAQ
          </Button>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publication Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={content.slug}
                  onChange={(e) => setContent({ ...content, slug: e.target.value })}
                  placeholder="auto-generated-from-title"
                />
              </div>

              <div>
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={content.author}
                  onChange={(e) => setContent({ ...content, author: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={content.status}
                  onValueChange={(value: any) => setContent({ ...content, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
