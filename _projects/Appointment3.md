---
layout: project
title: "Web publishing appointment 3"
name: "Appointment 3"
enrollby: "FIIT STU"
for: "/img/fiit_logo.gif"
date: 2017-5-11
tags: webpublishing xsd xml xslt 
url: "Appointment3"
---

<p>Našou úlohou pri poslednom zadaní bolo vytvoriť vlastné transformácie dát z <b>.xml</b> do <b>XHTML</b> alebo <b>PDF</b> za použitia vlastných navrhnutých transofrmácií <b>XSLT</b></p>

<p>Pri vytváraní rôznych súčastí zadania som využil náležitosti opísané v nasledujúcich bodoch:</p>
	
<ul>
	<li>Pre opis typu dokumentu som použil <b>XML Schema</b> (odovzdane v schema.xsd)</li>
	<li>Dáta, ktoré boli využité na konverziu v súbore project.xml</li>
	<li>Hlavná transformácia z .xml do .xhtml sa nachádza v súbore transform.xsl, pričom konverziu som robil pomocou SAXON-u</li>
	<li>V hlavnej transformácii využívam aj templates pre jednotlivé tagy odovzdané pod názvami xtemplate.xsl pričom x je názov pre tag na ktorý sa používa</li>
	<li>Pre konverziu medzi .xml a .pdf som vytvoril transformáciu transform-fo.xsl, ktorá je využitá v pdf_xep so vstupom v podobe project.xml</li>
</ul>

<p>Root prvkom .xml dokumentu je element &gt;presentation&lt;, ktorý obsahuje element &gt;slides&lt;. Tento element zhlukuje elementy &gt;slide&lt; dokopy. Tento element obsahuje element &gt;title&lt; v podobe titulky daného slidu. Element &gt;slide&lt; môže byť ďalej modifikovaný podľa toho, ktorú špecifikáciu do neho vložím. Bližšie špecifikácie elementu &gt;slide&lt; sú:</p>

<ul>
	<li>bulletslide = slide s možnosťou použitia listu</li>
	<li>imageslide = slide s možnosťou použitia obrázku</li>
	<li>textslide = slide s možnosťou použitia viacerých paragrafov s podtitulkami</li>
	<li>titlepageslide = špeciálny slide pre úvodný slide</li>
</ul> 

<p>Ukážka bližšej špecifikácie slajdu pomocou elementu imageslide:</p>

{% highlight xml %}
	<slide>
		<title>Slide s obrázkom</title>
		<imageslide imagewidth="600" imageheight="350">
			<image>http://www.desktopimages.org/pictures/2014/0204/1/th1_196730.jpg</image>
			<subtitle>Titulok k obrázku</subtitle>
			<content>Text pre obrázok</content>
		</imageslide>
	</slide>
{% endhighlight %}

<p>Pri tvorbe obsahu alebo prechádzaní jednotlivých slide-ov pre aplikovanie template-ov som používal cyklus, ktorý iteruje cez všetky slidy a vykonáva potrebné úkony. Cyklus bol použitý v nasledujúcej forme:</p>

{% highlight xml %}
	<xsl:for-each select="$allslides/slide">
    		<!-- Vykonaj potrebné úkony -->
  	</xsl:for-each>
{% endhighlight %}

<p>Pri transformácii z .xml do .pdf sme použili súbor odovzdaný pod menom transform-fo.xsl. Okrem dizajnu slidov som vytvoril možnosť pre statický footer v spodnej časti slajdu. Pri rozhodovaní aký dizajn použiť som používal podobný prístup pomocou cyklu. Na transformáciu som použil modifikovaný bat súbor <b>pdf_xep.bat</b>, v ktorom som pozmenili len to, z ktorej transformácie sa má čerpať. Názarné ukážky transformácie je možné vidieť tu:</p>

{% highlight xml %}
	<!-- Výber templatu, ktorý bude použitý na vytvorenie dizajnu slidu -->
	<xsl:for-each select="/presentation/slides/slide">
      <fo:page-sequence master-reference="type-slide">
      <!-- Footer sa nach=adza na každom slide -->
      <xsl:call-template name="footer"/>
        <fo:flow flow-name="slide-body">
          <fo:block>
          	<!-- Výber dizajnu na základe mena elementu v .xml -->
            <xsl:if test="./textslide">
              <xsl:call-template name="textslide"/>       
            </xsl:if>
            <xsl:if test="./bulletslide">
              <xsl:call-template name="bulletslide"/>       
            </xsl:if>
            <xsl:if test="./imageslide">
              <xsl:call-template name="imageslide"/>       
            </xsl:if>
          </fo:block>
        </fo:flow>
      </fo:page-sequence>   
    </xsl:for-each>
{% endhighlight %}

{% highlight xml %}
	<!-- Statický footer, ktorý sa nachádza v rezervovanej časti v spodnej časti slidu -->
	<xsl:template name="footer">
	  <fo:static-content flow-name="xsl-region-after">
	    <fo:block padding-top="10pt" border-top="1pt solid black" text-align-last="justify" font-size="14pt" margin-left="2cm" margin-right="2cm" margin-bottom="0.5cm" font-family="sans-serif">
	      <!-- Justify align to left/right corner-->
	      Page: <fo:page-number/>
	      <fo:leader leader-pattern="space" />
	      Author: <xsl:value-of select="$info/author"/>
	    </fo:block>
	  </fo:static-content>
	</xsl:template>
{% endhighlight %}

<p>Okrem základných vecí som pri tvorení dizajnu som používal aj atribúty, ktoré je potrebné zadať v .xml dokumente pri zodpovedajúci element. Zoznam atribútov pre elementy je nasledovný:</p>

<ul>
	<li>bulletslide = atribút list-style-type, ktorý mení vzhľad odrážky</li>
	<li>imageslide = atribúty width a height, ktoré specifikujú veľkosť a šírku obrázku</li>
	<li>paragraph = atribút text-align, ktorý nám hovorí o zarovnaní textu v paragrafoch</li>
</ul>

<p>Vlastný dizajn je dostupný v súbore styles.css. Okrem toho som používal aj voľne dostupný stylesheet Bootstrap. Okrem iného som používal aj rôznu dodatkovú funkcionalitu dopytovacieho jazyka XPath alebo XSL. Pre lepšiu predstavu je tieto dodatky vidieť v nasledujúcich častiach:</p>

{% highlight xml %}
	<xsl:element name="p">
			<!-- Štylizovanie zarovnania pragrafu pre, pričom sme zobrali najp názov a potom hodnotu atribútu a aplikovali na <p>-->
			<xsl:attribute name="style"><xsl:value-of select="./name(@*[position()])"/>:<xsl:value-of select="./@text-align"/></xsl:attribute>
			<xsl:value-of select="./content"/>
	</xsl:element>
{% endhighlight %}

{% highlight xml %}
	<!-- Získanie počtu slidov a uloženie do premennej pagecount -->
	<xsl:variable name="pagecount" select="count(//slide)"/>
{% endhighlight %}

{% highlight xml %}
	<!-- Časť, ktorá hovorí o tom, že pokiaľ je zvolena pozícia slidu posledná, tak nepridáme button na prekliknut na dalšiu stranu-->
	<xsl:if test="position() != last()">
        	<a href="slide{position()+1}.html" class="button">Next</a>
    	</xsl:if>
{% endhighlight %}