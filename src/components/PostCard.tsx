import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Post } from '../lib/api'
import { Card, Text, View, useThemeColor } from './Themed'
import { FontAwesome } from '@expo/vector-icons'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const color = useThemeColor({}, 'primary')

  return (
    <Card style={styles.container}>
      <Card style={styles.header}>
        <Image source={{ uri: "https://images.unsplash.com/photo-1564564244660-5d73c057f2d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80" }} style={styles.avatar} />
        <Text style={styles.username}>John Doe</Text>
      </Card>

      {post.image && (
        <Card style={styles.imageContainer}>
          <Image source={{ uri: post.image }} style={styles.image} />
        </Card>
      )}

      <Card style={styles.content}>
        <Text style={styles.contentText}>{post.content}</Text>
        <Card style={styles.footer}>
          <TouchableOpacity>
            <FontAwesome name="heart-o" size={24} color={color} />
          </TouchableOpacity>
        </Card>
      </Card>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  username: {
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  contentText: {
    fontSize: 16,
  },
  footer: {
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    marginTop: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})
