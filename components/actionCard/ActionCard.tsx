import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

export default function ActionCard() {
  function openWebsite(websiteLink: string) {
    Linking.openURL(websiteLink);
  }

  return (
    <View>
      <Text style={styles.headingText}>Action Card</Text>

      <View style={[styles.card, styles.elevatedCard]}>
        <View style={styles.headingContainer}>
          <Text style={styles.headerText}>
            What's New in Javascript 21 - ES12
          </Text>
        </View>
        <Image
          source={{
            uri: 'https://medicarehospital.pk/wp-content/uploads/2022/10/General-Surgery.png',
          }}
          style={styles.cardImage}
        />
        <View style={styles.body}>
          <Text style={styles.bodyText} numberOfLines={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
            repellat consectetur aspernatur magni explicabo, possimus ab dolores
            voluptas nulla recusandae rem eveniet atque architecto dicta
            doloribus amet accusamus blanditiis sapiente.
          </Text>
        </View>
        <View style={styles.Footer}>
          <TouchableOpacity
            onPress={() =>
              openWebsite(
                'https://local.medicarehospital.pk:98/frmOnlineLabReportsNew1.aspx',
              )
            }
            style={styles.socialLink}>
            <Text>Read More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: '#74B9FF',
    margin: 12,
    borderRadius: 12,
    shadowColor: 'grey',
    shadowOpacity: 1,
    shadowOffset : {
        width : 5,
        height : 5
    }
  },
  elevatedCard: {},
  headingContainer: {
    alignItems: 'center',
    padding: 14,
  },
  headerText: {
    fontSize: 15,
    fontWeight: '500',
    alignItems: 'center',
    color: 'white',
  },
  cardImage: {
    width: 390,
    height: 400,
    alignItems: 'center',
  },
  body: {
    padding: 18,
  },
  bodyText: {
    color: 'white',
  },
  Footer: {},
  socialLink: {
    padding: 12,
  },
});
