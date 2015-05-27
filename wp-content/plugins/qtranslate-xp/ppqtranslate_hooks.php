<?php // encoding: utf-8

/*  Copyright 2014  
	modified by Papa Salvatore Mirko (email : mirko@primapagina.it)
	originally created by Qian Qin (email : mail@qianqin.de)

	This program is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation; either version 2 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program; if not, write to the Free Software
	Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA02110-1301USA
*/

/* qTranslate Hooks */

function ppqtrans_header(){
	global $q_config;
	echo "\n<meta http-equiv=\"Content-Language\" content=\"".str_replace('_','-',$q_config['locale'][$q_config['language']])."\" />\n";
	$css = "<style type=\"text/css\" media=\"screen\">\n";
	$css .=".ppqtrans_flag span{display:none}\n";
	$css .=".ppqtrans_flag{height:12px;width:18px;display:block}\n";
	$css .=".ppqtrans_flag_and_text{padding-left:20px}\n";
	$css .=".ppqtrans_flag_and_text{padding-left:20px}\n";
	$baseurl = WP_CONTENT_URL;
	if(isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS'] == '1' || $_SERVER['HTTPS'] == 'on')) {
		$baseurl = preg_replace('#^http://#','https://', $baseurl);
	}
	foreach($q_config['enabled_languages'] as $language) {
		$css .=".ppqtrans_flag_".$language." { background:url(".$baseurl.'/'.$q_config['flag_location'].$q_config['flag'][$language].") no-repeat }\n";
	}
	$css .="</style>\n";
	echo apply_filters('ppqtranslate_header_css',$css);
	// skip the rest if 404
	if(is_404()) return;
	// set links to translations of current page
	foreach($q_config['enabled_languages'] as $language) {
		if($language != ppqtrans_getLanguage())
			echo '<link hreflang="'.$language.'" href="'.ppqtrans_convertURL('',$language).'" rel="alternate" />'."\n";
	}	
}

function ppqtrans_localeForCurrentLanguage($locale){
	global $q_config;
	// try to figure out the correct locale
	$locale = array();
	$locale[] = $q_config['locale'][$q_config['language']].".utf8";
	$locale[] = $q_config['locale'][$q_config['language']]."@euro";
	$locale[] = $q_config['locale'][$q_config['language']];
	$locale[] = $q_config['windows_locale'][$q_config['language']];
	$locale[] = $q_config['language'];
	
	// return the correct locale and most importantly set it (wordpress doesn't, which is bad)
	// only set LC_TIME as everyhing else doesn't seem to work with windows
	setlocale(LC_TIME, $locale);
	
	return $q_config['locale'][$q_config['language']];
}

function ppqtrans_optionFilter($do='enable') {
	$options = array(	'option_widget_pages',
						'option_widget_archives',
						'option_widget_meta',
						'option_widget_calendar',
						'option_widget_text',
						'option_widget_categories',
						'option_widget_recent_entries',
						'option_widget_recent_comments',
						'option_widget_rss',
						'option_widget_tag_cloud'
					);
	foreach($options as $option) {
		if($do!='disable') {
			add_filter($option, 'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
		} else {
			remove_filter($option, 'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage');
		}
	}
}

function ppqtrans_adminHeader() {
	echo "<link href='http://fonts.googleapis.com/css?family=Ubuntu' rel='stylesheet' type='text/css'>\n";
	echo "<style type=\"text/css\" media=\"screen\">\n";
	echo ".ppqtrans_title_input{border:0 none;font-size:1.7em;outline-color:invert;outline-style:none;outline-width:medium;padding:0;width:100%}\n";
	echo "#ppqtrans_textarea_content_ifr{min-height:450px!important;-moz-resize:both;-webkit-resize:both;resize:both}\n";
	echo ".mce-wp-fullscreen button{display:none!important}\n";
	echo ".ppqtrans_title_wrap{border-color:#CCCCCC;border-style:solid;border-width:1px;padding:2px 3px}\n";
	echo "#ppqtrans_textarea_content{padding:6px;border:0 none;line-height:150%;outline:none;margin:0;width:100%;-moz-box-sizing:border-box;";
	echo	"-webkit-box-sizing:border-box;-khtml-box-sizing:border-box;box-sizing:border-box}\n";
	echo ".ppqtrans_title{text-transform:uppercase;font:16px Ubuntu!important;background-image: -ms-linear-gradient(bottom left, #0074A2 0%, #001824 100%);";
	echo "background-image: -moz-linear-gradient(bottom left, #0074A2 0%, #001824 100%);background-image: -o-linear-gradient(bottom left, #0074A2 0%, #001824 100%);";
	echo "background-image: -webkit-gradient(linear, left bottom, right top, color-stop(0, #0074A2), color-stop(1, #001824));";
	echo "background-image: -webkit-linear-gradient(bottom left, #0074A2 0%, #001824 100%);background-image: linear-gradient(to top right, #0074A2 0%, #001824 100%);color:#fff;";
	echo	"-webkit-border-top-right-radius:6px;-webkit-border-top-left-radius:6px;-khtml-border-top-right-radius:6px;-khtml-border-top-left-radius:6px;";
	echo	"border-top-right-radius:6px;border-top-left-radius:6px}\n";
	echo ".hide-if-no-js.wp-switch-editor.switch-tmce{margin-left:6px!important}";
	echo "#ppqtranslate_debug{width:100%;height:200px}";
	echo "#postexcerpt textarea{height:4em;margin:0;width:98%}";
	echo ".ppqtranslate_lang_div{float:right;height:12px; width:18px; padding:6px 5px 8px 5px; cursor:pointer }";
	echo ".ppqtranslate_lang_div.active{background:#DFDFDF;border-left:1px solid #D0D0D0;border-right:1px solid #F7F7F7;padding:6px 4px 8px 4px}";
	do_action('ppqtranslate_css');
	echo "</style>\n";
	
	return ppqtrans_optionFilter('disable');
}

function ppqtrans_useCurrentLanguageIfNotFoundShowAvailable($content) {
	global $q_config;
	return ppqtrans_use($q_config['language'], $content, true);
}

function ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage($content) {
	global $q_config;
	return ppqtrans_use($q_config['language'], $content, false);
}

function ppqtrans_useDefaultLanguage($content) {
	global $q_config;
	return ppqtrans_use($q_config['default_language'], $content, false);
}

function ppqtrans_excludeUntranslatedPosts($where) {
	global $q_config, $wpdb;
	if($q_config['hide_untranslated'] && !is_singular()) {
		$where .= " AND $wpdb->posts.post_content LIKE '%<!--:".ppqtrans_getLanguage()."-->%'";
	}
	return $where;
}

function ppqtrans_excludePages($pages) {
	global $wpdb, $q_config;
	static $exclude = 0;
	if(!$q_config['hide_untranslated']) return $pages;
	if(is_array($exclude)) return array_merge($exclude, $pages);
	$query = "SELECT id FROM $wpdb->posts WHERE post_type = 'page' AND post_status = 'publish' AND NOT ($wpdb->posts.post_content LIKE '%<!--:".ppqtrans_getLanguage()."-->%')" ;
	$hide_pages = $wpdb->get_results($query);
	$exclude = array();
	foreach($hide_pages as $page) {
		$exclude[] = $page->id;
	}
	return array_merge($exclude, $pages);
}

function ppqtrans_postsFilter($posts) {
	if(is_array($posts)) {
		foreach($posts as $post) {
			$post->post_content = ppqtrans_useCurrentLanguageIfNotFoundShowAvailable($post->post_content);
			$post = ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage($post);
		}
	}
	return $posts;
}

function ppqtrans_links($links, $file){ // copied from Sociable Plugin
	//Static so we don't call plugin_basename on every plugin row.
	static $this_plugin;
	if (!$this_plugin) $this_plugin = plugin_basename(dirname(__FILE__).'/ppqtranslate.php');
	
	if ($file == $this_plugin){
		$settings_link = '<a href="options-general.php?page=qtranslate">' . __('Settings', 'qtranslate') . '</a>';
		array_unshift( $links, $settings_link ); // before other links
	}
	return $links;
}

function ppqtrans_languageColumnHeader($columns){
	$new_columns = array();
	if(isset($columns['cb']))			$new_columns['cb'] = '';
	if(isset($columns['title']))		$new_columns['title'] = '';
	if(isset($columns['author']))		$new_columns['author'] = '';
	if(isset($columns['categories']))	$new_columns['categories'] = '';
	if(isset($columns['tags']))			$new_columns['tags'] = '';
	$new_columns['language'] = __('Languages', 'qtranslate');
	return array_merge($new_columns, $columns);;
}

function ppqtrans_languageColumn($column) {
	global $q_config, $post;
	if ($column == 'language') {
		$available_languages = ppqtrans_getAvailableLanguages($post->post_content);
		$missing_languages = array_diff($q_config['enabled_languages'], $available_languages);
		$available_languages_name = array();
		$missing_languages_name = array();
		foreach($available_languages as $language) {
			$available_languages_name[] = $q_config['language_name'][$language];
		}
		$available_languages_names = join(", ", $available_languages_name);
		
		echo apply_filters('ppqtranslate_available_languages_names',$available_languages_names);
		do_action('ppqtranslate_languageColumn', $available_languages, $missing_languages);
	}
	return $column;
}

function ppqtrans_versionLocale() {
	return 'en_US';
}

function ppqtrans_esc_html($text) {
	return ppqtrans_useDefaultLanguage($text);
}

function ppqtrans_useRawTitle($title, $raw_title = '', $context = 'save') {
	if($raw_title=='') $raw_title = $title;
	if('save'==$context) {
		$raw_title = ppqtrans_useDefaultLanguage($raw_title);
		$title = remove_accents($raw_title);
	}
	return $title;
}

function ppqtrans_checkCanonical($redirect_url, $requested_url) {
	// fix canonical conflicts with language urls
	if(ppqtrans_convertURL($redirect_url)==ppqtrans_convertURL($requested_url)) 
		return false;
	return $redirect_url;
}

function ppqtrans_fixSearchForm($form) {
	$form = preg_replace('#action="[^"]*"#','action="'.trailingslashit(ppqtrans_convertURL(get_home_url())).'"',$form);
	return $form;
}

function ppqtrans_fixAdminBar($wp_admin_bar) {
	global $wp_admin_bar;
	foreach($wp_admin_bar->get_nodes() as $node) {
		$wp_admin_bar->add_node(ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage($node));
	}
}

// Hooks for Plugin compatibility

function wpsupercache_supercache_dir($uri) {
	global $q_config;
	if(isset($q_config['url_info']['original_url'])) {
		$uri = $q_config['url_info']['original_url'];
	} else {
		$uri = $_SERVER['REQUEST_URI'];
	}
	$uri = preg_replace('/[ <>\'\"\r\n\t\(\)]/', '', str_replace( '/index.php', '/', str_replace( '..', '', preg_replace("/(\?.*)?$/", '', $uri ) ) ) );
	$uri = str_replace( '\\', '', $uri );
	$uri = strtolower(preg_replace('/:.*$/', '',  $_SERVER["HTTP_HOST"])) . $uri; // To avoid XSS attacs
	return $uri;
}
add_filter('supercache_dir',					'wpsupercache_supercache_dir',0);



// Hooks (Actions)
add_action('wp_head',						'ppqtrans_header');
add_action('category_edit_form',			'ppqtrans_modifyTermFormFor');
add_action('post_tag_edit_form',			'ppqtrans_modifyTermFormFor');
add_action('link_category_edit_form',		'ppqtrans_modifyTermFormFor');
add_action('category_add_form',				'ppqtrans_modifyTermFormFor');
add_action('post_tag_add_form',				'ppqtrans_modifyTermFormFor');
add_action('link_category_add_form',		'ppqtrans_modifyTermFormFor');
add_action('widgets_init',					'ppqtrans_widget_init'); 
add_action('plugins_loaded',				'ppqtrans_init', 2); 
add_action('admin_head',					'ppqtrans_adminHeader');
add_action('admin_menu',					'ppqtrans_adminMenu');
add_action('wp_before_admin_bar_render',	'ppqtrans_fixAdminBar');
add_action('wp_tiny_mce_init', 				'ppqtrans_TinyMCE_init');

// Hooks (execution time critical filters) 
add_filter('the_content',					'ppqtrans_useCurrentLanguageIfNotFoundShowAvailable', 0);
add_filter('the_excerpt',					'ppqtrans_useCurrentLanguageIfNotFoundShowAvailable', 0);
add_filter('the_excerpt_rss',				'ppqtrans_useCurrentLanguageIfNotFoundShowAvailable', 0);
add_filter('sanitize_title',				'ppqtrans_useRawTitle',0, 3);
add_filter('comment_moderation_subject',	'ppqtrans_useDefaultLanguage',0);
add_filter('comment_moderation_text',		'ppqtrans_useDefaultLanguage',0);
add_filter('get_comment_date',				'ppqtrans_dateFromCommentForCurrentLanguage',0,2);
add_filter('get_comment_time',				'ppqtrans_timeFromCommentForCurrentLanguage',0,4);
add_filter('get_post_modified_time',		'ppqtrans_timeModifiedFromPostForCurrentLanguage',0,3);
add_filter('get_the_time',					'ppqtrans_timeFromPostForCurrentLanguage',0,3);
add_filter('get_the_date',					'ppqtrans_dateFromPostForCurrentLanguage',0,4);
add_filter('locale',						'ppqtrans_localeForCurrentLanguage',99);
add_filter('the_title',						'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage', 0);
add_filter('term_name',						'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
add_filter('tag_rows',						'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
add_filter('list_cats',						'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
add_filter('wp_list_categories',			'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
add_filter('wp_dropdown_cats',				'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
add_filter('wp_title',						'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
add_filter('single_post_title',				'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
add_filter('bloginfo',						'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
add_filter('get_others_drafts',				'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
add_filter('get_bloginfo_rss',				'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
add_filter('get_wp_title_rss',				'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
add_filter('wp_title_rss',					'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
add_filter('the_title_rss',					'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
add_filter('the_content_rss',				'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
add_filter('gettext',						'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
add_filter('get_pages',						'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
add_filter('category_description',			'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
add_filter('bloginfo_rss',					'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
add_filter('the_category_rss',				'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
add_filter('wp_generate_tag_cloud',			'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
add_filter('term_links-post_tag',			'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
add_filter('link_name',						'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
add_filter('link_description',				'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
add_filter('pre_option_rss_language',		'ppqtrans_getLanguage',0);
add_filter('the_author',					'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
add_filter( "_wp_post_revision_field_post_title", 'ppqtrans_showAllSeperated', 0);
add_filter( "_wp_post_revision_field_post_content", 'ppqtrans_showAllSeperated', 0);
add_filter( "_wp_post_revision_field_post_excerpt", 'ppqtrans_showAllSeperated', 0);

// Hooks (execution time non-critical filters) 

add_filter('author_feed_link',				'ppqtrans_convertURL');
add_filter('author_link',					'ppqtrans_convertURL');
add_filter('author_feed_link',				'ppqtrans_convertURL');
add_filter('day_link',						'ppqtrans_convertURL');
add_filter('get_comment_author_url_link',	'ppqtrans_convertURL');
add_filter('month_link',					'ppqtrans_convertURL');
add_filter('page_link',						'ppqtrans_convertURL');
add_filter('post_link',						'ppqtrans_convertURL');
add_filter('year_link',						'ppqtrans_convertURL');
add_filter('category_feed_link',			'ppqtrans_convertURL');
add_filter('category_link',					'ppqtrans_convertURL');
add_filter('tag_link',						'ppqtrans_convertURL');
add_filter('term_link',						'ppqtrans_convertURL');
add_filter('the_permalink',					'ppqtrans_convertURL');
add_filter('feed_link',						'ppqtrans_convertURL');
add_filter('post_comments_feed_link',		'ppqtrans_convertURL');
add_filter('tag_feed_link',					'ppqtrans_convertURL');
add_filter('get_pagenum_link',				'ppqtrans_convertURL');
// Support for custom post types
add_filter('post_type_link','ppqtrans_convertURL');
add_filter('post_type_archive_link','ppqtrans_convertURL');
add_filter('get_search_form',				'ppqtrans_fixSearchForm', 10, 1);
add_filter('manage_posts_columns',			'ppqtrans_languageColumnHeader');
add_filter('manage_posts_custom_column',	'ppqtrans_languageColumn');
add_filter('manage_pages_columns',			'ppqtrans_languageColumnHeader');
add_filter('manage_pages_custom_column',	'ppqtrans_languageColumn');
add_filter('wp_list_pages_excludes',	    'ppqtrans_excludePages');
add_filter('comment_notification_text', 	'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage');
add_filter('comment_notification_headers',	'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage');
add_filter('comment_notification_subject',	'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage');

add_filter('the_editor',					'ppqtrans_modifyRichEditor');
add_filter('admin_footer',					'ppqtrans_modifyExcerpt');
add_filter('bloginfo_url',					'ppqtrans_convertBlogInfoURL',10,2);
add_filter('plugin_action_links', 			'ppqtrans_links', 10, 2);
add_filter('manage_language_columns',		'ppqtrans_language_columns');
add_filter('core_version_check_locale',		'ppqtrans_versionLocale');
add_filter('redirect_canonical',			'ppqtrans_checkCanonical', 10, 2);
// skip this filters if on backend
if(!defined('WP_ADMIN')) {
	add_filter('the_posts',					'ppqtrans_postsFilter');
	add_filter('wp_setup_nav_menu_item',		'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage');
	
	// Compability with Default Widgets
	ppqtrans_optionFilter();
	add_filter('widget_title',				'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
	add_filter('widget_text',				'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
	
	// filter options
	add_filter('esc_html',					'ppqtrans_esc_html', 0);
	// don't filter untranslated posts in admin
	add_filter('posts_where_request',		'ppqtrans_excludeUntranslatedPosts');
	
	// leave terms in default language
	add_filter('cat_row',					'ppqtrans_useTermLib',0);
	add_filter('cat_rows',					'ppqtrans_useTermLib',0);
	add_filter('wp_get_object_terms',		'ppqtrans_useTermLib',0);
	add_filter('single_tag_title',			'ppqtrans_useTermLib',0);
	add_filter('single_cat_title',			'ppqtrans_useTermLib',0);
	add_filter('the_category',				'ppqtrans_useTermLib',0);
	add_filter('get_term',					'ppqtrans_useTermLib',0);
	add_filter('get_terms',					'ppqtrans_useTermLib',0);
	add_filter('get_category',				'ppqtrans_useTermLib',0);
	add_filter('get_comment_author',		'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
	add_filter('the_author',				'ppqtrans_useCurrentLanguageIfNotFoundUseDefaultLanguage',0);
}

?>