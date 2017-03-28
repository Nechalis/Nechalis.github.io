---
layout: project
title: "Web publishing appointment 2"
name: "Appointment 2"
enrollby: "FIIT STU"
for: "/img/fiit_logo.gif"
date: 2017-03-12
tags: webpublishing xml docbook xslt
url: "Appointment1"
---
<p>Našou úlohou bolo spracovať bakalársku prácu do formátu DocBook. Pôvodne bola moja bakalárska práca napisána v Latex-u a snažil som sa aby sa tá v DocBooku čo najviac podobala pôvodnej.</p>

<b>Požiadavky na vypracovanie:</b>
<ul>
<li>Čo sa členenia textu týka, tak som použil klasické členenie na kapitoly, podkapitoly, popodkapitola za pomoci tagov <b>chapter</b> a <b>section</b>. V práci sa nachádza aj dodatok, v ktorom sa nachádzaju len testovacie paragrafy(nie z bakalárskej práce). Z generovaného obsahu práca obsahuje zoznam obrázkov a tabuliek, register pojmov a literatúru.</li>
<li>Na zvýraznenie textu som použil tagy ako &lt;emphasis&gt; na kurzivé alebo &lt;emphasis role="strong"&gt; pre tučné písmo. Taktiež som použil elementy &lt;orderdlist&gt; a &lt;itemizedlist&gt; pre vytvorenie textu s číslovaním alebo odrážkami. V poslednej sekcii som taktiež použil element &lt;subscript&gt; pred dolný index.</li>
<li>V práci som taktiež použil odkazovanie sa na iné časti vlastnej práce za pomoci &lt;xref linkend=""&gt; alebo odkazovanie sa na url použitej v poznámke pod čiarou.</li>
<li>V práci sa nachádzaju poznámky pod čiarouk za použitia elementu &lt;footnote&gt;.</li>
<li>V práci sa nachádza zoznam použitej literatúry s množstvom odkazov v texte.</li>
<li>Práca obsahuje veľké množstvo obrázkou spolu s odkazmi na príslušné obrázky v texte. V práci sa tiež nachádza jedna tabuľka, na ktorú je taktiež odkazované. Obe požiadavky majú na začiatku práce vygenerovaný zoznam. Zoznam bol vygenerovaný doplnením <b>figure</b> a <b>table</b> v nasledovnom bloku v súbore <span style="color:red">thesis</span>:</li>
{% highlight xml %}
	<xsl:param name="generate.toc">
	 book    title,toc,figure,table
	</xsl:param>
{% endhighlight %}
<li>Na konci práce sa nachádza register pojmov, do ktorého sa pojmy pridávajú pomocou elementov <b>&lt;envar&gt;text&lt;/envar&gt;&lt;indexterm&gt;&lt;primary&gt;text&lt;/primary&gt;&lt;secondary&gt;text&lt;/secondary&gt;&lt;/indexterm&gt;</b>. Register pojmov na konci práce sa následne vytvorí po pridaní nasledujúceho bloku:</li>
{% highlight xml %}
	<index>
    	 <title>Index</title> 
  	</index>
{% endhighlight %}
</ul>

<b>Doplňujúce úpravy šablóny:</b>
<ul>
<li>V súbore <span style="color:red">thesis-tp-fo</span> som upravil pôvodoný element <b>othername</b> a premenoval ho na <b>footer</b> aby sa podobal na úpravu titulnej stránky v mojej bakalárke.</li>
<li>Úpravou prešli aj jednotlivé titulky s názvom práce atď., pričom som v súbore <span style="color:red">thesis-tp-fo</span> prehodil ich poradie a odsadenie aby som dosiahol výsledné rozloženie ako v mojej bakalárke.</li>
<li>V súbore <span style="color:red">thesis</span> som urobil viacero zmien aby som mohol viac manipulovať s pôvodnými elementami a to menovite:</li>

<p>V elemente <b>para</b> som si dodal flag <b>margin</b>, ktorému nadstavujem veľkosť. Reálne to na daný para element vytvorí margin-bottom aby som pod ním simuloval prázdny riadok. Ukážka:</p>

{% highlight xml %}
	<xsl:template match="para[@margin]">
	  <fo:block margin-bottom="{@margin}">
	     <xsl:apply-templates/>
	  </fo:block>
	</xsl:template>
{% endhighlight %}

<p>V elemente <b>para</b> som tiež pridal flag <b>align</b>, ktorý reprezentuje text-align. Využitý je hlavne v anotácii, kde som ho použil na odsadenie ohľadom informácii o fakulte a bakalárskej práci. Ukážka:</p>

{% highlight xml %}
	<xsl:template match="para[@align]">
	  <fo:block text-align="{@align}">
	     <xsl:apply-templates/>
	  </fo:block>
	</xsl:template>
{% endhighlight %}

<p>V elementoch <b>orderedlist</b> a <b>itemizedlist</b> som na odsadenie viac do stredu strany použil taktiež flag <b>margin</b>, ktorého hodnota sa premieta do margin-left a margin-bottom. Ukážka:</p>

{% highlight xml %}
	<xsl:template match="itemizedlist[@margin]">
	  <fo:list-block margin-left="{@margin}" margin-bottom="{@margin}">
	     <xsl:apply-templates/>
	  </fo:list-block>
	</xsl:template>
{% endhighlight %}

{% highlight xml %}
	<xsl:template match="orderedlist[@margin]">
	  <fo:list-block margin-left="{@margin}" margin-bottom="{@margin}">
	     <xsl:apply-templates/>
	  </fo:list-block>
	</xsl:template>
{% endhighlight %}

<li>Okrem iného som použil množstvo ďalších elementov na upravenie vzhľadu, ktoré však nemusia byť extra spomínané.</li>
</ul>
