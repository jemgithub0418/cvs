from django.db import models
from ckeditor.fields import RichTextField
# Create your models here.

class YearLevel(models.Model):
    year = models.CharField(max_length= 30)

    def __str__(self):
        return self.year

    def save(self, *args, **kwargs):
        for field_name in ['year']:
            val = getattr(self,field_name, False)
            if val:
                setattr(self, field_name, val.capitalize())

        super(YearLevel,self).save(*args,**kwargs)

class Section(models.Model):
    section_name = models.CharField(max_length= 100)
    year_level = models.ForeignKey(YearLevel, on_delete=models.SET_NULL, null=True, blank= True)

    def __str__(self):
        return f'{self.year_level}, {self.section_name}'


class Subject(models.Model):
    subject_name = models.CharField(max_length=255)
    subject_code = models.CharField(max_length= 55)
    year_level = models.ForeignKey(YearLevel, on_delete=models.SET_NULL, null= True, blank= True)
    unit = models.PositiveSmallIntegerField()

    def __str__(self):
        return f"{self.subject_name}, ({self.subject_code}), for {self.year_level}"


class SchoolPeriod(models.Model):
    period = models.CharField(max_length= 55)

    def __str__(self):
        return self.period


class UpcomingEvents(models.Model):
    date_of_event = models.DateField()
    time_of_event = models.TimeField()
    date_posted = models.DateTimeField(auto_now_add= True)
    event = models.CharField(max_length= 255)
    description = RichTextField(blank= True) 

    class Meta:
        verbose_name_plural = "Upcoming Events"

    def __str__(self):
        return self.event


class Announcements(models.Model):
    announcement = models.CharField(max_length= 255)
    description = RichTextField()
    date_posted = models.DateTimeField(auto_now_add= True)

    class Meta:
        verbose_name_plural = "Announcements"

    def __str__(self):
        return self.announcement

class VerseOfTheDay(models.Model):

    DAY_CHOICES = [
        (1,"Monday"),(2, "Tuesday"), (3, "Wednesday"), (4,"Thursday"),(5,"Friday"), (6,"Saturday"), (7, "Sunday")
    ]

    book = models.CharField(max_length=55)
    chapter = models.PositiveSmallIntegerField()
    # last_chapter = models.PositiveSmallIntegerField(blank=True)
    starting_verse = models.PositiveSmallIntegerField()
    last_verse = models.PositiveSmallIntegerField(blank= True, null= True)
    content = RichTextField()
    display_during = models.PositiveSmallIntegerField(choices = DAY_CHOICES, default='1')
    content = RichTextField()

    class Meta:
        verbose_name_plural = "Verse of the Day"

    def __str__(self):
        if self.last_verse != None:
            return f"For {self.get_display_during_display()}s, {self.book} {self.chapter}:{self.starting_verse}-{self.last_verse}"
        return f"For {self.get_display_during_display()}s, {self.book} {self.chapter}:{self.starting_verse}"

class AdmissionRequirements(models.Model):
    for_transferees = RichTextField()
    for_jr_hs = RichTextField()
    for_foreign_student = RichTextField()

    class Meta:
        verbose_name_plural = "Admission Requirements"

    def __str__(self):
        return "Admission Requirements"


class TuitionFees(models.Model):
    rules = RichTextField()
    school_year = models.CharField(max_length=55)
    tuition_content = RichTextField()

    class Meta:
        verbose_name_plural = "Tuition Fees"

    def __str__(self):
        return "Manage Tuition Fees"