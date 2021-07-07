import os
from django.db import models

# Create your models here.
def UploadToPathAndRename(instance, filename):
    upload_to='school_logo'
    ext = filename.split('.')[-1]
    filename = f'schoollogo.{ext}'
    return os.path.join(upload_to, filename)


class SchoolLogo(models.Model):
    image = models.ImageField(upload_to = UploadToPathAndRename)
