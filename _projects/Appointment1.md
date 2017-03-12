---
layout: project
title: "Web publishing appointment 1"
name: "Appointment 1"
enrollby: "FIIT STU"
for: "/img/fiit_logo.gif"
date: 2017-03-12
tags: webpublishing jekyll markdown github
url: "Appointment1"
---
Pre zadanie 1 som vytvoril statickú stránku za pomoci nástroja Jekyll a Github pages. Na stránke by sa mali nachádzať základne informácie o mne a mojej osobe taktiež ako aj o mojich skusenostiach v tab-e "About". Layouty sú k dispozícii v zložke _layouts, kde okrem 2 zložitejších(default, project) sú aj 2 jednoduchšie(post, about)

<b>Požiadavky na vypracovanie:</b>

<p>Stránka obsahuje viac ako 5 podstránok, cez ktoré sa je veľmi jednoduché preklikať. Na ukážku by som okrem základnych stránkac dostupných v menu vyskúšal aj jednotlive 	projekty v tab-e "WP"(Webové publikovanie) alebo blogové príspevky v tab-e "Blog".</p>

<p>V jednotlivých markdownoch pre projekty, posty a skills som využil rôzne premenné, ktoré uľahčia prácu pri pridávaní nových príspevkov. Spoemnul by som napriklad dolezitu premennu "tags" v projektoch a skilloch, ktoré rozdeľujú jednotlivé projekty do skupín na základe tagov. Okrem custom premenných využívam aj základné Jekyll premenné.</p>

<p>Okrem vstavanej kolekcie posts som si vytvoril ďalšie dve kolekcie projects a skills, ktoré som zapísal do config.yml a pridal zložky <b>_projects a _skills.</b> Ich využitie môžme vidieť pre skills v tab-e "About" a pre projects v tabe WP(Webové publikovanie)</p>

<p>V niektorých súboroch som použil zložitejšie konštrukcie nástroja Jekyll(Liquid) ako <b>for, if alebo assign</b>. S niektorými som využil doplnkové konštrukcie ako <b>uniq, join, upcase</b> atď. Najlepšie su konštrukcie viditeľné v zložke tags v súbore index.html (/tags/index.html), čo slúži ako tagovací systém a zgrupuje príspevky podla ich príslušných tabov. Dajú sa však nájsť aj v default.html layoute, kde som pomocou konštrukcie <b>if</b> vyriešil 404 podstránku.</p>

<p>Ako plugin som si vybral <b>Rouge</b>, ktorý zabezpečuje syntax-highlighting kusov kódu. Na jeho fungovanie je najprv potrebné nainštalovať príslušný gem:</p>

{% highlight ruby %}
	gem install rouge
{% endhighlight %}

<p>Po úspešnej inštalacii je potrebné tento plugin zapísať do config.yml ako:</p>

{% highlight ruby %}
	highlighter: rouge
{% endhighlight %}

<p>Pre lepšiu názornú ukážku:</p>
{% highlight csharp %}
	using System;
	class Program
	{
	    public static void Main(string[] args)
	    {
	        Console.WriteLine("Ukazka vacsieho kusu kodu v jazyku c#.");
	    }
	}
{% endhighlight %}

<p>Toto sú asi najdôležitejšie informácie k môjmu projektu a dúfam, že práca s ním bude pohodlná a jednoduchá.</p>