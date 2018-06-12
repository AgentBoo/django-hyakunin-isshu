from django.db import models

# Create your models here.
# add __str__() as a convenience for the interactive prompt, so it does not print out
# something like <Question: Question object (1)>

class Poem(models.Model):
    numeral = models.PositiveIntegerField()
    jap_author = models.CharField(max_length=256)
    rom_author = models.CharField(max_length=256)
    eng_author = models.CharField(max_length=256)

    db_table = '"poems"'

    def __str__(self):
        return '{number} {author}'.format(number=self.numeral, author=self.rom_author)


class Jap(models.Model):
    poem = models.ForeignKey(Poem, on_delete = models.CASCADE)
    line_1 = models.CharField(max_length=256)
    line_2 = models.CharField(max_length=256)
    line_3 = models.CharField(max_length=256)
    line_4 = models.CharField(max_length=256)
    line_5 = models.CharField(max_length=256)

    def __str__(self):
        return self.line_1

class Rom(models.Model):
    poem = models.ForeignKey(Poem, on_delete = models.CASCADE)
    line_1 = models.CharField(max_length=256)
    line_2 = models.CharField(max_length=256)
    line_3 = models.CharField(max_length=256)
    line_4 = models.CharField(max_length=256)
    line_5 = models.CharField(max_length=256)

    def __str__(self):
        return self.line_1

class Eng(models.Model):
    poem = models.ForeignKey(Poem, on_delete = models.CASCADE)
    line_1 = models.CharField(max_length=256)
    line_2 = models.CharField(max_length=256)
    line_3 = models.CharField(max_length=256)
    line_4 = models.CharField(max_length=256)
    line_5 = models.CharField(max_length=256)

    def __str__(self):
        return self.line_1
