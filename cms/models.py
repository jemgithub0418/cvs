import os
from django.db import models

# Create your models here.
def UploadToPathAndRename(instance, filename):
    upload_to='school_logo'
    ext = filename.split('.')[-1]
    filename = f'schoollogo.{ext}'
    return os.path.join(upload_to, filename)


class SchoolLogo(models.Model):
    image = models.ImageField(upload_to = UploadToPathAndRename,max_length= 255,)
    # ext = models.CharField(max_length= 10, null= True, blank= True)

    class Meta:
        verbose_name_plural = 'School Logo'

    def delete(self, *args, **kwargs):
        old_logo = SchoolLogo.objects.all()
        os.remove(old_logo[0].image.path)
        self.image.delete()
        super().delete(*args, **kwargs)

    def save(self, *args, **kwargs):
        old_logo = SchoolLogo.objects.all()
        if old_logo.count() > 0:
            if os.path.exists(old_logo[0].image.path):
                os.remove(old_logo[0].image.path)
            old_logo.delete()
        super(SchoolLogo, self).save(*args, **kwargs)

    def __str__(self):
        return 'Change School Logo'


class HomeCarousel(models.Model):
    image = models.ImageField(upload_to= 'homecarousel', max_length= 255,)
    label = models.CharField(max_length = 255)
    content = models.CharField(max_length= 255)

    def __str__(self):
        return self.label
