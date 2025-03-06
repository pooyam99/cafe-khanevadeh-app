import { useEffect, useRef, useState } from "react";
import { Locales } from "@/lib";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Keyboard } from "react-native";
import { IconButton, Searchbar, useTheme } from "react-native-paper";

import { useSearch } from "@/lib/context/SearchContext";

const SearchBar = () => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const { searchQuery, setSearchQuery, setIsSearching, resetSearch } =
    useSearch();
  const [loading, setLoading] = useState(false);
  const searchbarRef = useRef<any>(null);
  const navigation = useNavigation();
  const route = useRoute();

  // Focus searchbar when it becomes visible
  useEffect(() => {
    if (visible && searchbarRef.current) {
      setTimeout(() => {
        searchbarRef.current?.focus();
      }, 100);
    }
  }, [visible]);

  // Reset search when tab changes
  useEffect(() => {
    const unsubscribe = navigation.addListener("state", (e) => {
      // Check if the route has changed
      if (e.data.state.routes[e.data.state.index].name !== route.name) {
        resetSearch();
        setVisible(false);
      }
    });

    return unsubscribe;
  }, [navigation, route, resetSearch]);

  // Handle search query changes
  const handleChangeSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(query.length > 0);

    if (query.length > 0) {
      setLoading(true);
      // Simulate search delay
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  // Handle search bar close
  const handleClose = () => {
    setVisible(false);
    resetSearch();
    Keyboard.dismiss();
  };

  return (
    <>
      {!visible ? (
        <IconButton icon="magnify" onPress={() => setVisible(true)} />
      ) : (
        <Searchbar
          ref={searchbarRef}
          value={searchQuery}
          // loading={loading}
          onChangeText={handleChangeSearch}
          placeholder={Locales.t("search")}
          onIconPress={handleClose}
          icon="arrow-right"
          style={{
            width: "94%",
            height: "70%",
            justifyContent: "center",
          }}
          inputStyle={{
            alignSelf: "center",
            textAlignVertical: "center",
          }}
          elevation={1}
          placeholderTextColor={theme.colors.outline}
        />
      )}
    </>
  );
};

export default SearchBar;
