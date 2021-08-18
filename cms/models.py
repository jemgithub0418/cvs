import os
from django.db import models
from ckeditor.fields import RichTextField


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


    class Meta:
        verbose_name_plural = 'Home Page Carousel'

    def __str__(self):
        return self.label


class Mission(models.Model):
    mission = RichTextField()
    # mission = models.TextField(max_length= 1000)

    class Meta:
        verbose_name_plural = 'Mission'

    def __str__(self):
        return "Mission"


class Vision(models.Model):
    # vision = models.TextField(max_length = 1000)
    vision = RichTextField()

    class Meta:
        verbose_name_plural = 'Vision'

    def __str__(self):
        return "Vision"


class ImageBesideMissionVision(models.Model):
    image = models.ImageField(upload_to='Mission and Vision pic', max_length=255)

    class Meta:
        verbose_name_plural = 'Image Beside Mission Vision'

    def __str__(self):
        return "Change Mission and Vision Image"


class SiteBackground(models.Model):
    image = models.ImageField(upload_to='Site Background', max_length= 255)

    class Meta: 
        verbose_name_plural = 'Site Background'

    def __str__(self):
        return "Change Site Background"


class SiteHeaderImage(models.Model):
    image = models.ImageField(upload_to='Site Header Image', max_length= 255)
    caption = models.CharField(max_length= 255, blank= True, null= True)

    class Meta:
        verbose_name_plural = 'Site Header Image'

    def __str__(self):
        return "Change Site Header Image"


class SchoolContactNumbers(models.Model):
    contact_number = models.CharField(max_length= 15)

    class Meta:
        verbose_name_plural = 'Contact Numbers'

    def __str__(self):
        return self.contact_number

class SchoolAddress(models.Model):
    street = models.CharField(max_length= 55)
    town = models.CharField(max_length= 55)
    city = models.CharField(max_length= 55)
    province = models.CharField(max_length= 55)

    class Meta:
        verbose_name_plural = "School Address"

    def __str__(self):
        return f"School Address: {self.town}"

class SchoolEmail(models.Model):
    email = models.EmailField()

    def __str__(self):
        return self.email

class SchoolOfficeHours(models.Model):
    DAY_CHOICES = [
        (1, 'Monday'),
        (2, 'Tuesday'),
        (3, 'Wednesday'),
        (4, 'Thursday'),
        (5, 'Friday'),
        (6, 'Saturday'),
        (7, 'Sunday')
    ]

    HOUR_CHOICES = [
        (1,'6AM'),
        (2,'7AM'),
        (3,'8AM'),
        (4,'9AM'),
        (5,'10AM'),
        (6,'11AM'),
        (7,'12NN'),
        (8,'1PM'),
        (9,'2PM'),
        (10,'3PM'),
        (11,'4PM'),
        (12,'5PM'),
        (13,'6PM'),
        (14,'7PM'),
        (15,'8PM'),
        (16,'9PM'),
    ]

    starting_day = models.PositiveSmallIntegerField(
            choices = DAY_CHOICES,
            default = '1',
        )
    last_day = models.PositiveSmallIntegerField(
            choices = DAY_CHOICES,
            default = '5'
        )
    opening = models.PositiveSmallIntegerField(
            choices = HOUR_CHOICES,
            default = '3',
        )
    closing = models.PositiveSmallIntegerField(
            choices = HOUR_CHOICES,
            default = '12'
        )

    class Meta:
        verbose_name_plural = 'School Office Hours'

    def __str__(self):
        return f"School Office Hours: from {self.get_starting_day_display()} to {self.get_last_day_display()}, {self.get_opening_display()} - {self.get_closing_display()}"