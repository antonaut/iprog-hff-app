dinnerPlannerApp.factory('lang', function(lang_sv, lang_en) {
	var languages = {
		en: lang_en,
		sv: lang_sv,
	};

	languages.get = function(language) {
		return this[language];
	};
	return languages;
});