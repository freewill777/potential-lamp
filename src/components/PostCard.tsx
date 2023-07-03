import { Alert, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Likes, Post, Profile, downloadAvatar, fecthLikes } from '../lib/api'
import { Card, Text, useThemeColor } from './Themed'
import { FontAwesome } from '@expo/vector-icons'
import { useUserInfo } from '../lib/userContext'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Avatar from './Avatar'
import { supabase } from '../lib/supabase'

interface PostCardProps {
  post: Post
  onDelete: () => void
}

export default function PostCard({ post, onDelete }: PostCardProps) {
  const color = useThemeColor({}, 'primary')
  const profile = post.profile as Profile
  const user = useUserInfo()
  const [avatarUrl, setAvatarUrl] = useState('')
  const [likes, setLikes] = useState<Likes>([])
  
  const userLikesPost = useMemo(() => likes?.find((like) => like.user_id === user?.profile?.id), [likes, user]) 

  const getLikes = useCallback(() =>   fecthLikes(post.id).then(setLikes), [post])

  useEffect(() => {
    getLikes()
  }, [getLikes])

  useEffect(() => {
    if (profile?.avatar_url) {
      downloadAvatar(profile.avatar_url).then(setAvatarUrl)
    }
  }, [profile])

  const toggleLike = async () => {
    if (!user.profile) return

    if(userLikesPost) {
      // delete this
      const { error } = await supabase.from('post_likes').delete().eq('id', userLikesPost.id)
      if (error) Alert.alert(error.message)
    } else {
      const { error } = await supabase.from('post_likes').insert({
        post_id: post.id,
        user_id: user?.profile?.id,
      })
  
      if (error) Alert.alert(error.message)
    }
 
    getLikes()
 
  }

  function confirmDelete() {
    Alert.alert(
      'Borrar el post',
      '¿Estás seguro de que quieres borrar el post?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => onDelete() },
      ]
    )
  }

  return (
    <Card style={styles.container}>
      <Card style={styles.header}>
        <Avatar uri={avatarUrl} />
        <Text style={styles.username}>{profile?.username}</Text>
      </Card>

      {post.image && (
        <Card style={styles.imageContainer}>
          <Image source={{ uri: post.image }} style={styles.image} />
        </Card>
      )}

      <Card style={styles.content}>
        <Text style={styles.contentText}>{post.content}</Text>
        <Card style={styles.footer}>
          <TouchableOpacity
            onPress={toggleLike}
            style={{ flexDirection: 'row', alignItems: 'flex-end' }}
          >
            <FontAwesome name={userLikesPost ? 'heart' : 'heart-o'} size={24} color={color} />
            {likes.length >= 0 && <Text>{likes.length}</Text>}
          </TouchableOpacity>

          {user?.profile?.id === post.user_id && (
            <TouchableOpacity onPress={confirmDelete}>
              <FontAwesome name="trash-o" size={24} color={color} />
            </TouchableOpacity>
          )}
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
    marginLeft: 8,
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
    alignItems: 'center',
    gap: 8,
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
