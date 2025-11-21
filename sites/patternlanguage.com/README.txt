
This README.txt is provided in following languages:
Этот README.txt предоставлен на следующих языках:
Este README.txt está en los siguientes idiomas:

  * English
  * Русский (смотрите ниже)
  * Español (más abajo)

==============================================================================

INSTRUCTION (English version)
-----------------------------
This folder contains the files required for launching a copy of a recovered/downloaded website on the hosting server managed by Apache 2.x or NGINX.

All the important files containing the website's content are in .content.xxxxxxxx directory. Its name starts with a period for security purposes, so that it is not displayed in the list of directories located on the server when the directory listing is opened.

The most convenient way to upload a site to your hosting is to perform a simple installation through Archivarix CMS.
  https://en.archivarix.com/cms/
To do this, upload the script archivarix.cms.php to the root of your domain and open it in a browser. All you need is a unique serial number to your site, which is in each letter or on the page of your recovery.

If you want to perform manual configuration, upload the directory .content.xxxxxxxx and the files .htaccess, index.php to the root of the site.

ATTENTION!!!
In case you do not see the directory named .content.xxxxxxxx or the file named .htaccess, you are possibly using MacOS which hides directories and files whose names start with a period by default. To see them, press Cmd+Shift+. (period) on your keyboard.
In case you use a Unix terminal, you use the command `ls -a` (with the parameter -a), to see this directory and the files.


APACHE SERVER WITH PHP
----------------------
 * Make sure the server has PHP 5.6 or above installed on it. You also must have the PDO_SQLITE extension activated (it is named simply pdo for PHP 5, and pdo_sqlite for PHP 7)
 * Please, avoid using PHP as Apache module. Use FastCGI mode instead.
 * It is sufficient to upload the .content.xxxxxxxx directory and the index.php and the .htaccess files to the hosting server's root directory


NGINX SERVER WITH PHP
---------------------
*Make sure the server has PHP 5.6 or above installed on it. You also must have the PDO_SQLITE extension activated (it is named simply pdo for PHP 5, and pdo_sqlite for PHP 7)
  * It is sufficient to upload the .content.xxxxxxxx directory and the index.php file to the hosting server's root directory.
  * You need to add the following rule to the NGINX configuration:
      try_files $uri $uri/ /index.php;
  Nginx configs can be very different. It's just important to direct all requests to /index.php, including *.php requests.


INTEGRATION WITH OTHER CMS
--------------------------
To perform the integration, just upload the Archivarix CMS script (archivarix.cms.php) to the root of your site and perform the proposed installation using the serial number of your recovery. The system itself will determine Wordpress / Joomla and will suggest integration.

Download the latest version of Archivarix CMS here:
  https://en.archivarix.com/cms/

If you want to perform the integration manually, upload the .content.xxxxxxxxx folder with its contents to the root of the site. After that, upload the .htaccess, archivarix.php files from the archive to the root of the site using the link:
  https://en.archivarix.com/download/archivarix.loader.integration.zip

This solution will allow you to display the full working version of the old site on the site and at the same time add new pages to your CMS. You will not be able to see or edit the restored site from Wordpress. It is simply the work of two sites independently on the same domain. You can edit the restored site through Archivarix CMS.

To disable integration, just delete the .htaccess and archivarix.php files.

Attention, if you do not have Apache on the server, but only Nginx, then you need to add a rule that will direct ALL requests from nonexistent files and directories to the archivarix.php file in the root. To disable integration, be sure to remove this rule from the nginx configuration.


index.php PARAMETERS
--------------------
ARCHIVARIX_LOADER_MODE
  turns on the CMS mode, when the php-script coexists with your already installed CMS and does not do anything (passes the management to the CMS) if the requested address is not among the recovered ones. Upon the launch of this mode, the following five parameters are automatically turned off (*MISSING*). Read the instruction on integration above. By default, it is set to 0, i.e. turned off. Previously this parameter was called ARCHIVARIX_CMS_MODE.

ARCHIVARIX_PROTOCOL
  three values are available: "any" (default), "http" and "https". If the value is "any", the site will work on http and https at the same time. If the value is set to a specific protocol, then all requests will be redirected to this protocol.

ARCHIVARIX_FIX_MISSING_IMAGES
  display an empty, transparent .png picture in order to avoid possible 404 errors

ARCHIVARIX_FIX_MISSING_CSS
  display an empty text file in order to avoid possible 404 errors

ARCHIVARIX_FIX_MISSING_JS
  display an empty text file in order to avoid possible 404 errors

ARCHIVARIX_FIX_MISSING_ICO
  display an empty valid .ico file in order to avoid possible 404 errors

ARCHIVARIX_REDIRECT_MISSING_HTML
  the path where redirection should be carried out to in case of a missing .html page

ARCHIVARIX_INCLUDE_CUSTOM
  has parameters:
    FILE - the name of the file that you place in .content.xxxxxxxx/includes/ directory
    KEYPHRASE - a combination of symbols, tag ot comment that will be replaced to the content of the file,
    LIMIT - of how many matches to replace, set -1 for unlimited
    REGEX - set 1 to enable perl regular expressions,
    POSITION - set -1 to place before KEYPHRASE, 0 to replace, 1 to place after KEYPHRASE

ARCHIVARIX_CONTENT_PATH
  if you have renamed the .content.xxxxxxxx directory specify the new name in this parameter. By default, the script automatically searches for a directory of the .content.xxxxxxxx type in its directory and uses the first found one.

ARCHIVARIX_CACHE_CONTROL_MAX_AGE
  for static files, the max-age parameter of the Cache-Control heading is set by default. You can change the time value in seconds or delete it by setting 0.

ARCHIVARIX_CUSTOM_DOMAIN
  restored website can run on another domain be default. Set this parameter only if $_SERVER['HTTP_HOST'] value is not recognized correctly.
  
ARCHIVARIX_SITEMAP_PATH
  specify the path for automatic generation of xml site maps. If the number of pages exceeds 50,000, a sitemap index will be created with links to xml sitemaps.
  
ARCHIVARIX_CATCH_MISSING
  experimental parameter. Tracks and saves the requested and not found URLs in a separate table.


CONTACTS
--------  
In case you have any other questions, need help or you've got great ideas about how our service can be improved - feel free to write an email to hello@archivarix.com or chat with our support on Telegram https://t.me/archivarixsupport

==============================================================================

ИНСТРУКЦИЯ (Русская версия)
---------------------------
В данной папке содержатся файлы, необходимые для запуска копии восстановленного/скачанного сайта на хостинге под управлением Apache 2.x или NGINX.

Все файлы с содержимым сайта находятся в папке .content.xxxxxxxx. Она начинается с точки по причинам безопасности, чтобы не отображаться в списке папок на сервере при открытом листинге директории.

Самый удобный способ загрузить сайт на ваш хостинг, это выполнить простую установку через Archivarix CMS. 
  https://ru.archivarix.com/cms/
Для этого загрузите скрипт archivarix.cms.php в корень вашего домена и откройте его в браузере. Вам понадобится только уникальный серийный номер вашего сайта, который есть в каждом письме или на странице вашего восстановления.

Если вы хотите выполнить настройку вручную, то загрузите в корень сайта директорию.content.xxxxxxxx и файлы .htaccess, index.php.

ВНИМАНИЕ!!! Если вы не видите папку с названием .content.xxxxxxxx или файла .htaccess, вероятнее всего вы используете операционную систему MacOS, которая по-умолчанию скрывает файлы и папки, начинающиеся с точки. Чтобы увидеть их, нажмите на клавиатуре комбинацию клавиш Cmd+Shift+. (точка).
Если вы пользуетесь терминалом на Unix-системе, используйте команду `ls -a` (с параметром -a), чтобы увидеть эту папку и файлы.


СЕРВЕР APACHE С PHP
--------------------
 * Убедитесь, что на сервере установлен PHP версии 5.6 или выше и php расширение PDO_SQLITE (для PHP 5-ой версии он просто называется pdo, для PHP 7-ой версии pdo_sqlite)
 * Желательно не использовать PHP в режиме модуля Apache. Используйте режим FastCGI.
 * На хостинг в корень достаточно загрузить папку .content.xxxxxxxx, а так же файлы index.php и .htaccess


СЕРВЕР NGINX С PHP
------------------
 * Убедитесь, что на сервере установлен PHP версии 5.6 или выше и php расширение PDO_SQLITE (для PHP 5-ой версии он просто называется pdo, для PHP 7-ой версии pdo_sqlite)
 * На хостинг в корень достаточно загрузить папку .content.xxxxxxxx, а так же файл index.php
 * В конфигурации NGINX необходимо добавить правило:
    try_files $uri $uri/ /index.php;
 Правила конфигурации nginx могут бывают очень разными. Важно, чтобы все запросы, включая *.php были направлены на /index.php


ИНТЕГРАЦИЯ С ДРУГИМИ CMS
------------------------
Чтобы выполнить интеграцию, достаточно загрузить скрипт Archivarix CMS (archivarix.cms.php) в корень вашего сайта и выполнить предлагаемую установку по серийному номеру вашего восстановления. Система сама определит Wordpress/Joomla и предложит выполнить интеграцию.

Актуальную версию Archivarix CMS скачайте здесь:
  https://ru.archivarix.com/cms/

Если вы хотите выполнить интеграцию вручную, то загрузите в корень сайта папку .content.xxxxxxxxx с её содержимым. После этого загрузите в корень сайта файлы .htaccess, archivarix.php из архива по ссылке:
  https://ru.archivarix.com/download/archivarix.loader.integration.zip

Данное решение позволит отображать на сайте полноценную рабочую версию старого сайта и одновременно добавлять новые страницы в вашу CMS. Вы не сможете видеть или редактировать восстановленный сайт из Wordpress. Это просто работа двух сайтов независимо друг от друга на одном домене. Редактировать восстановленный сайт вы можете через Archivarix CMS.

Чтобы отключить интеграцию, достаточно удалить файлы .htaccess и archivarix.php.

Внимание, если у вас на сервере нет Apache, а стоит только Nginx, то необходимо добавить правило, которое будет направлять ВСЕ запросы у несуществующих файлов и директорий на файл archivarix.php в корне. Для отключения интеграции не забудьте убрать это правило из конфигурации nginx.


ПАРАМЕТРЫ index.php
-------------------
ARCHIVARIX_LOADER_MODE
  включает режим CMS, когда наш php скрипт живет совместно с вашей установленной CMS и ничего не делает (передает управление CMS) если запрашиваемого адреса нет среди восстановленных. При включении этого режима автоматически отключаются последующие 5 параметров (*MISSING*). Инструкцию по интеграции читайте выше. Ранее этот параметр назывался ARCHIVARIX_CMS_MODE.

ARCHIVARIX_PROTOCOL
  доступны три значения: "any" (по-умолчанию), "http" и "https". При значении "any" сайт будет работать на http и https одновременно. Если значение установить конкретный протокол, то все запросы будут перенаправляться на этот протокол.

ARCHIVARIX_FIX_MISSING_IMAGES
  показывать пустую прозрачную png картику, чтобы избежать лишних 404 ошибок

ARCHIVARIX_FIX_MISSING_CSS
  показывать пустой текстовой файл, чтобы избежать лишних 404 ошибок

ARCHIVARIX_FIX_MISSING_JS
  показывать пустой текстовой файл, чтобы избежать лишних 404 ошибок

ARCHIVARIX_FIX_MISSING_ICO
  показывать пустой валидный ico файл, чтобы избежать лишних 404 ошибок

ARCHIVARIX_REDIRECT_MISSING_HTML
  путь, куда следует делать перенаправление в случае отсутствующей html страницы

ARCHIVARIX_INCLUDE_CUSTOM
  имеет параметры:
    FILE - название подгружаемого файла, который нужно расположить в папке .content.xxxxxxxx/includes/,
    KEYPHRASE - комбинация символов, тег или комментарий, вхождение которого будет заменено на содержимое указанного файла,
    LIMIT - количество найденных вхождений, которые будут заменены, уставновите -1 для замены всех вхождений,
    REGEX - set 1 to enable perl regular expressions,
    POSITION - установите значение -1, чтобы подгрузить файл до найденной KEYPHRASE, 0 чтобы заменить, 1 чтобы подгрузить после KEYPHRASE

ARCHIVARIX_CONTENT_PATH
  если вы сменили название папки .content.xxxxxxxx, тогда укажите его в этом параметре. По-умолчанию скрипт автоматически ищет папку вида .content.xxxxxxxx в своей директории и использует первую найденную

ARCHIVARIX_CACHE_CONTROL_MAX_AGE
  для статических файлов по-умолчанию задан параметр max-age заголовка Cache-Control. Вы можете изменить значение времени в секундах или убрать его выставив 0

ARCHIVARIX_CUSTOM_DOMAIN
  восстановленные сайты могут работать на других доменах по-умолчанию. Используйте этот параметр только если $_SERVER['HTTP_HOST'] не распознается корректно.
  
ARCHIVARIX_SITEMAP_PATH
  укажите путь для автоматической генерации xml карты сайта. Если количество страниц превышает 50000, то создастся sitemap index с ссылками на xml sitemap'ы.
  
ARCHIVARIX_CATCH_MISSING
  экспериментальный параметр. Отслеживает и сохраняет в отдельную таблицу запрашиваемые и не найденные урлы.

КОНТАКТЫ
--------  
Если у Вас есть другие вопросы, нужна помощь или появились хорошие идеи для улучешения нашего сервиса - пишите на наш имейл hello@archivarix.com или пообщайтесь с нашей поддержкой в Telegram https://t.me/archivarixsupport

==============================================================================

INSTRUCCIÓN (versión española)
------------------------------
Esta carpeta contiene los archivos, necesarios para lanzar la copia del sitio restaurado/descargado en el alojamiento web bajo el control de Apache 2.x o NGINX.

Todos los archivos con el contenido del sitio se encuentran en la carpeta .content.xxxxxxxx. Empieza por un punto por motivos de seguridad, para no reflejarse en la lista de carpetas en el servidor con el listado abierto del directorio.

La forma más conveniente de cargar un sitio en su alojamiento es realizar una instalación simple a través de Archivarix CMS.
  https://es.archivarix.com/cms/
Para hacerlo, suba el script archivarix.cms.php a la raíz de su dominio y ábralo en un navegador. Solo necesitará el número de serie único de su sitio, que se encuentra en cada letra o en su página de recuperación.

Si desea realizar la configuración manualmente, cargue el directorio .content.xxxxxxxx y los archivos .htaccess, index.php en la raíz del sitio.

¡¡¡ATENCION!!! Si no ve la carpeta con el nombre .content.xxxxxxxx o el archivo .htaccess, lo más seguro es que esté usando el sistema operativo MacOS, el cual por defecto oculta los archivos y las carpetas que empiezan por un punto. Para verlos, pulse en el teclado la combinación de teclas Cmd+Shift+. (punto).
Si usa un terminal en un sistema Unix, use el comando `ls -a` (con el parámetro -a), para ver esta carpeta y archivos.


SERVIDOR APACHE CON PHP
-----------------------
 * Asegúrese de que en el servidor esté instalado PHP versión 5.6 o superior y la extensión php PDO_SQLITE (para PHP versión 5 se llama simplemente pdo, para PHP versión 7 pdo_sqlite)
 * Por favor, evite usar PHP como módulo Apache. Utilice el modo FastCGI en su lugar.
 * En el alojamiento web, en la raíz, es suficiente con cargar la carpeta .content.xxxxxxxx, así como los archivos index.php y .htaccess
	
SERVIDOR NGINX CON PHP
----------------------
 * Asegúrese de que en el servidor esté instalado PHP versión 5.6 o superior y la extensión php PDO_SQLITE (para PHP versión 5 se llama simplemente pdo, para PHP versión 7 pdo_sqlite)
 * En el alojamiento web, en la raíz, es suficiente con cargar la carpeta .content.xxxxxxxx, así como el archivo index.php
 * En la configuración NGINX hay que añadir la regla:
    try_files $uri $uri/ /index.php;
 Las configuraciones de Nginx pueden ser muy diferentes. Es importante dirigir todas las solicitudes a /index.php, incluidas las solicitudes * .php.


INTEGRACIÓN CON OTROS CMS
-------------------------
Para realizar la integración, simplemente cargue el script Archivarix CMS (archivarix.cms.php) en la raíz de su sitio y realice la instalación propuesta utilizando el número de serie de su recuperación. El sistema mismo determinará Wordpress / Joomla y sugerirá la integración.

Descargue la última versión de Archivarix CMS aquí:
  https://es.archivarix.com/cms/

Si desea realizar la integración manualmente, cargue la carpeta .content.xxxxxxxxx con su contenido en la raíz del sitio. Después de eso, cargue los archivos .htaccess, archivarix.php del archivo a la raíz del sitio usando el enlace:
  https://es.archivarix.com/download/archivarix.loader.integration.zip

Esta solución le permitirá mostrar la versión de trabajo completa del sitio anterior en el sitio y, al mismo tiempo, agregar nuevas páginas a su CMS. No podrá ver ni editar el sitio restaurado desde Wordpress. Es simplemente el trabajo de dos sitios independientemente en el mismo dominio. Puede editar el sitio restaurado a través de Archivarix CMS.

Para deshabilitar la integración, simplemente elimine los archivos .htaccess y archivarix.php.

Atención, si no tiene Apache en el servidor, sino solo Nginx, debe agregar una regla que dirija TODAS las solicitudes de archivos y directorios inexistentes al archivo archivarix.php en la raíz. Para deshabilitar la integración, asegúrese de eliminar esta regla de la configuración de nginx.


PARÁMETROS index.php
--------------------
ARCHIVARIX_LOADER_MODE
 activa el modo CMS, cuando nuestro script php convive conjuntamente con su CMS instalado y no hace nada (le pasa el control al CMS) si la dirección solicitada no está entre las restauradas. Al activar este modo, automáticamente se desactivan los siguientes 5 parámetros (*MISSING*). Lea más arriba la instrucción de integración. Anteriormente este parámetro se llamaba ARCHIVARIX_CMS_MODE.

ARCHIVARIX_PROTOCOL
  hay tres valores disponibles: "any" (predeterminado), "http" y "https". Si el valor es "any", el sitio se ejecutará en http y https al mismo tiempo. Si el valor se establece en un protocolo específico, todas las solicitudes se redirigirán a este protocolo.

ARCHIVARIX_FIX_MISSING_IMAGES
 mostrar una imagen png vacía transparente, para evitar excesivos errores 404

ARCHIVARIX_FIX_MISSING_CSS
 mostrar un archivo de texto vacío, para evitar excesivos errores 404

ARCHIVARIX_FIX_MISSING_JS
mostrar un archivo de texto vacío, para evitar excesivos errores 404

ARCHIVARIX_FIX_MISSING_ICO
mostrar un archivo ico válido vacío, para evitar excesivos errores 404

ARCHIVARIX_INCLUDE_BODY
  precisamente como el parámetro anterior. El nombre del archivo, cuyo contenido se añade delante del tag de cierre </body> para las páginas html.

ARCHIVARIX_INCLUDE_CUSTOM
  tiene parámetros:
    FILE - nombre del archivo que se carga, que hay que ubicar en la carpeta .content.xxxxxxxx/includes/,
    KEYPHRASE - combinación de símbolos, tag o comentario, cuya entrada será reemplazada por el contenido del archivo indicado
    LIMIT - cuántas coincidencias reemplazar, -1 para ilimitado
    REGEX - establece 1 para habilitar las expresiones regulares en Perl,
    POSITION - configure -1 para colocar antes de KEYPHRASE, 0 para reemplazar, 1 para colocar después de KEYPHRASE

ARCHIVARIX_CONTENT_PATH
  si ha cambiado el nombre de la carpeta .content.xxxxxxxx, entonces indíquelo en este parámetro. Por defecto el script busca automáticamente la carpeta de tipo .content.xxxxxxxx en su directorio y usa la primera encontrada

ARCHIVARIX_CACHE_CONTROL_MAX_AGE
  para los archivos estáticos por defecto está establecido el parámetro max-age del encabezado Cache-Control. Puede cambiar el valor en segundos o quitarlo poniendo 0

ARCHIVARIX_CUSTOM_DOMAIN
  los sitios restaurados pueden funcionar en otros dominios por defecto. Use este parámetro sólo si $_SERVER['HTTP_HOST'] no se reconoce correctamente.
  
ARCHIVARIX_SITEMAP_PATH
   especifique la ruta para la generación automática de mapas de sitio xml. Si el número de páginas supera las 50,000, se creará un índice de mapa del sitio con enlaces a mapas de sitios xml.
  
ARCHIVARIX_CATCH_MISSING
   parámetro experimental. Hace un seguimiento y guarda las URL solicitadas y no encontradas en una tabla separada.

CONTACTOS
---------  
Si tiene otras dudas, necesita ayuda o tiene buenas ideas para mejorar nuestro servicio - escríbanos a nuestro correo electrónico hello@archivarix.com o póngase en contacto con nuestro servicio de soporte técnico en Telegram https://t.me/archivarixsupport

